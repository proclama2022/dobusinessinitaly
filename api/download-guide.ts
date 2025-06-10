import type { VercelRequest, VercelResponse } from '@vercel/node';

// Configurazione delle guide disponibili
const LEAD_MAGNETS: Record<string, any> = {
  'italian-business-guide': {
    title: 'Guida Completa: Come Aprire un\'Attività in Italia da Straniero',
    emailSubjects: {
      it: '📩 La tua guida completa per aprire un\'attività in Italia',
      en: '📩 Your complete guide to starting a business in Italy',
      de: '📩 Ihr kompletter Leitfaden zur Unternehmensgründung in Italien',
      fr: '📩 Votre guide complet pour créer une entreprise en Italie',
      es: '📩 Tu guía completa para abrir un negocio en Italia'
    }
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
    return;
  }

  try {
    const { email, guideType = 'italian-business-guide', language = 'it', blogUrl, blogTitle } = req.body;
    
    console.log('Download guide request:', { email, guideType, language });

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email richiesta'
      });
    }

    // Verifica che la guida esista
    const guide = LEAD_MAGNETS[guideType];
    if (!guide) {
      return res.status(400).json({
        success: false,
        message: 'Tipo di guida non valido'
      });
    }

    // Invia i dati al webhook di Make.com per l'automazione
    try {
      const webhookUrl = 'https://hook.eu1.make.com/3rs9qd9jthmclmyy82akkiv4og0ria64';
      
      const webhookPayload = {
        email: email,
        guideType: guideType,
        language: language,
        guideTitle: guide.title,
        emailSubject: guide.emailSubjects[language] || guide.emailSubjects['it'],
        blogUrl: blogUrl || '',
        blogTitle: blogTitle || '',
        timestamp: new Date().toISOString(),
        source: 'yourbusinessinitaly.com',
        form_type: 'lead_magnet_download'
      };

      console.log('📤 Invio dati al webhook Make.com per la guida:', guideType);
      
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload)
      });

      if (webhookResponse.ok) {
        console.log('✅ Dati inviati con successo al webhook Make.com');
        console.log('📧 Richiesta guida inviata per:', email, '- Guida:', guideType, '- Lingua:', language);
      } else {
        console.error('❌ Errore risposta webhook:', webhookResponse.status, webhookResponse.statusText);
        throw new Error(`Webhook fallito con status: ${webhookResponse.status}`);
      }
      
    } catch (webhookError) {
      console.error('Errore invio dati al webhook:', webhookError);
      return res.status(500).json({
        success: false,
        message: 'Errore nell\'elaborazione della richiesta. Riprova più tardi.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Guida inviata con successo! Controlla la tua email.'
    });

  } catch (error: any) {
    console.error('Errore webhook download guide:', error);
    res.status(500).json({
      success: false,
      message: 'Errore interno del server'
    });
  }
} 