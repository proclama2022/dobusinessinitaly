import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import path from "path";
import dotenv from 'dotenv';
// Load environment variables from .env at startup
dotenv.config();
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  // Middleware per correggere URL malformati (Soft 404 fix)
  // Rileva URL che finiscono con .en-en, .fr-fr, etc. o .en.en
  const malformedUrlPattern = /(\/blog\/.*?)(\.[a-z]{2}-[a-z]{2}|\.[a-z]{2}\.[a-z]{2})$/i;
  if (malformedUrlPattern.test(path)) {
    const cleanUrl = path.replace(malformedUrlPattern, '$1');
    console.log(`[Redirect] Redirecting malformed URL: ${path} -> ${cleanUrl}`);
    return res.redirect(301, cleanUrl);
  }

  next();
});

// Imposta la password admin di esempio se non presente
if (!process.env.ADMIN_PASSWORD) {
  process.env.ADMIN_PASSWORD = 'supersegreta';
  console.log('ADMIN_PASSWORD non impostata, uso password di esempio: supersegreta');
}

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Serve static files from public/ directory (for both dev and prod)
  // This must come BEFORE vite middleware to properly serve images
  app.use(express.static('public', {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.webp')) {
        res.setHeader('Content-Type', 'image/webp');
      } else if (filePath.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/jpeg');
      } else if (filePath.endsWith('.avif')) {
        res.setHeader('Content-Type', 'image/avif');
      }
    }
  }));

  if (process.env.NODE_ENV === 'development') {
    const vite = await import('vite');
    const viteDevMiddleware = await vite.createServer({
      server: {
        middlewareMode: true,
      },
    }).then((server) => server.middlewares);
    app.use(viteDevMiddleware);
  } else {
    app.use(express.static('dist/public'));

    // SPA fallback: serve index.html for any unknown route
    app.use('*', (_req, res) => {
      res.sendFile(path.resolve('dist/public/index.html'));
    });
  }

  // Use PORT from environment variable or default to 3000
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  server.listen(port, () => {
    log(`serving on http://localhost:${port}`);
  });
})();

export default app;
