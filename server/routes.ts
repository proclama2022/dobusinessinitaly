import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(contactData);
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        data: submission
      });
    } catch (error: any) {
      res.status(400).json({ 
        success: false, 
        message: error.message || "Invalid contact form data" 
      });
    }
  });

  // Get contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.status(200).json(submissions);
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contact submissions" 
      });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const subscriberData = insertNewsletterSchema.parse(req.body);
      
      // Check if already subscribed
      const isSubscribed = await storage.isEmailSubscribed(subscriberData.email);
      if (isSubscribed) {
        return res.status(200).json({ 
          success: true, 
          message: "Email already subscribed to newsletter" 
        });
      }
      
      const subscriber = await storage.createNewsletterSubscriber(subscriberData);
      res.status(201).json({ 
        success: true, 
        message: "Subscribed to newsletter successfully",
        data: subscriber
      });
    } catch (error: any) {
      res.status(400).json({ 
        success: false, 
        message: error.message || "Invalid newsletter data" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
