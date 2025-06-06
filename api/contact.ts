import type { VercelRequest, VercelResponse } from '@vercel/node';
import { insertContactSchema } from '../shared/schema';

// This would normally use a proper database, but for now using a simple in-memory solution
// In production, you should use a proper database like PostgreSQL or MongoDB

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const contactData = insertContactSchema.parse(req.body);
      
      // For now, just log the contact data
      // In production, you would save this to a database
      console.log('Contact form submission:', {
        name: contactData.name,
        email: contactData.email,
        company: contactData.company,
        phone: contactData.phone,
        service: contactData.service,
        message: contactData.message,
        timestamp: new Date().toISOString()
      });

      // Send email notification (if email service is configured)
      try {
        // You can add email sending logic here
        // Example: await sendEmail({ ... });
        console.log(`Contact form submitted by ${contactData.name} (${contactData.email})`);
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue even if email fails
      }

      res.status(201).json({
        success: true,
        message: "Contact form submitted successfully",
        data: {
          id: Date.now().toString(), // Simple ID generation
          timestamp: new Date().toISOString(),
          status: 'received'
        }
      });
    } catch (error: any) {
      console.error('Contact form error:', error);
      res.status(400).json({
        success: false,
        message: error.message || "Invalid contact form data"
      });
    }
  } else if (req.method === 'GET') {
    // For admin purposes - could return submitted forms
    res.status(200).json({
      success: true,
      message: "Contact API is working",
      data: []
    });
  } else {
    res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }
} 