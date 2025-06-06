import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple validation schema without external dependencies
function validateContactData(data: any) {
  const errors: string[] = [];
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
    errors.push('Valid email is required');
  }
  
  if (!data.service || typeof data.service !== 'string' || data.service.trim().length === 0) {
    errors.push('Service is required');
  }
  
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.push('Message is required');
  }
  
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }
  
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    company: data.company?.trim() || '',
    phone: data.phone?.trim() || '',
    service: data.service.trim(),
    message: data.message.trim()
  };
}

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
      console.log('Contact API called with data:', req.body);
      const contactData = validateContactData(req.body);
      
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

      // Send email notification using Fetch to a mail service
      try {
        // Using a simple email service like Formspree or EmailJS
        const emailData = {
          to: 'amministrazione@yourbusinessinitaly.com', // Cambia con la tua email
          subject: `Nuovo messaggio da ${contactData.name} - YourBusinessInItaly`,
          html: `
            <h3>Nuovo messaggio dal form di contatto</h3>
            <p><strong>Nome:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Azienda:</strong> ${contactData.company || 'Non specificata'}</p>
            <p><strong>Telefono:</strong> ${contactData.phone || 'Non specificato'}</p>
            <p><strong>Servizio:</strong> ${contactData.service}</p>
            <p><strong>Messaggio:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; margin: 10px 0; border-left: 4px solid #009246;">
              ${contactData.message}
            </div>
            <hr>
            <small>Inviato da: https://yourbusinessinitaly.com/contact</small>
          `
        };
        
        console.log(`📧 Contact form submitted by ${contactData.name} (${contactData.email})`);
        console.log('📋 Contact data:', contactData);
        
        // Per ora solo log - implementeremo email service dopo
        console.log('📨 Email would be sent to: amministrazione@yourbusinessinitaly.com');
        
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