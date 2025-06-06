import { Request, Response, NextFunction } from "express";

/**
 * Middleware di autenticazione sicuro
 * @param req Richiesta Express
 * @param res Risposta Express
 * @param next Funzione next
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  // Per motivi di sicurezza, tutte le API admin sono temporaneamente disabilitate
  console.warn(`[SECURITY] Tentativo di accesso non autorizzato a: ${req.path} da IP: ${req.ip}`);
  
  return res.status(403).json({
    success: false,
    message: "Accesso negato. API amministrative temporaneamente disabilitate per motivi di sicurezza.",
    timestamp: new Date().toISOString(),
    requestId: Math.random().toString(36).substr(2, 9)
  });
}
