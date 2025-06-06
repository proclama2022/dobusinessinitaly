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

      // Send data to Make.com webhook for secure processing
      try {
        const webhookUrl = 'https://hook.eu1.make.com/6dupd1bdxjxjkd7iqjjbvc0qtavx9yk4';
        
        const webhookPayload = {
          name: contactData.name,
          email: contactData.email,
          company: contactData.company,
          phone: contactData.phone,
          service: contactData.service,
          message: contactData.message,
          timestamp: new Date().toISOString(),
          source: 'yourbusinessinitaly.com',
          form_type: 'contact'
        };

        console.log('📤 Sending data to Make.com webhook...');
        
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload)
        });

        if (webhookResponse.ok) {
          console.log('✅ Data sent successfully to Make.com webhook');
          console.log('📧 Contact form submitted by:', contactData.name, '(', contactData.email, ')');
        } else {
          console.error('❌ Webhook response error:', webhookResponse.status, webhookResponse.statusText);
          throw new Error(`Webhook failed with status: ${webhookResponse.status}`);
        }
        
              } catch (webhookError) {
        console.error('Failed to send data to webhook:', webhookError);
        // Continue even if webhook fails - form submission is still recorded
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