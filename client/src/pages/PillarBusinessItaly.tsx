import React from 'react';
import SEOHead from '../components/SEOHead';
import OptimizedImage from '../components/OptimizedImage';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

const PillarBusinessItaly = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isEnglish = lang === 'en';

  const breadcrumbs = [
    { label: isEnglish ? 'Home' : 'Home', path: `/${lang}` },
    { label: isEnglish ? 'How to Start a Business in Italy 2025' : 'Come Aprire Attività in Italia 2025', path: `/${lang}/pillar/how-to-start-business-in-italy-2025`, isLast: true }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Main Article Schema
      {
        '@type': 'TechArticle',
        '@id': `https://yourbusinessinitaly.com/${lang}/pillar/how-to-start-business-in-italy-2025#article`,
        'headline': isEnglish ? 'How to Start a Business in Italy 2025 - Complete Guide for Foreigners' : 'Come Aprire un\'Attività in Italia 2025 - Guida Completa per Stranieri',
        'description': isEnglish ? 'Complete step-by-step guide to start a business in Italy for foreigners in 2025. Learn about company formation, VAT registration, taxes, and legal requirements.' : 'Guida completa passo dopo passo per aprire un\'attività in Italia per stranieri nel 2025. Scopri come costituire società, aprire partita IVA, tasse e requisiti legali.',
        'image': 'https://yourbusinessinitaly.com/images/logo.png',
        'datePublished': '2025-01-01',
        'dateModified': '2025-06-23',
        'author': {
          '@type': 'Organization',
          'name': 'Yourbusinessinitaly.com',
          'url': 'https://yourbusinessinitaly.com'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Yourbusinessinitaly.com',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://yourbusinessinitaly.com/images/logo.png'
          }
        },
        'mainEntity': {
          '@type': 'ItemList',
          'name': isEnglish ? 'Steps to Start a Business in Italy' : 'Passi per Aprire un\'Attività in Italia',
          'numberOfItems': 8,
          'itemListElement': [
            {
              '@type': 'HowToStep',
              'position': 1,
              'name': isEnglish ? 'Choose Business Structure' : 'Scegli Struttura Aziendale',
              'text': isEnglish ? 'Decide between SRL, Partita IVA, or other business forms based on your needs' : 'Decidi tra SRL, Partita IVA o altre forme societarie in base alle tue esigenze'
            },
            {
              '@type': 'HowToStep',
              'position': 2,
              'name': isEnglish ? 'Register for VAT Number' : 'Registra Partita IVA',
              'text': isEnglish ? 'Open Partita IVA with Agenzia delle Entrate' : 'Apri Partita IVA con Agenzia delle Entrate'
            },
            {
              '@type': 'HowToStep',
              'position': 3,
              'name': isEnglish ? 'Open Company' : 'Apri Società',
              'text': isEnglish ? 'Complete company formation with notary and Chamber of Commerce' : 'Completa costituzione società con notaio e Camera di Commercio'
            },
            {
              '@type': 'HowToStep',
              'position': 4,
              'name': isEnglish ? 'Tax Registration' : 'Registrazione Fiscale',
              'text': isEnglish ? 'Register with tax authorities and understand tax obligations' : 'Registrati con autorità fiscali e capisci gli obblighi fiscali'
            }
          ]
        }
      },
      // FAQ Schema
      {
        '@type': 'FAQPage',
        '@id': `https://yourbusinessinitaly.com/${lang}/pillar/how-to-start-business-in-italy-2025#faq`,
        'mainEntity': [
          {
            '@type': 'Question',
            'name': isEnglish ? 'How much does it cost to start a business in Italy?' : 'Quanto costa aprire un\'attività in Italia?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': isEnglish ? 'Costs range from €2,500 to €15,000 depending on business structure. SRL starts at €2,500, while Partita IVA costs €150-€500.' : 'I costi variano da €2.500 a €15.000 a seconda della struttura aziendale. SRL parte da €2.500, mentre Partita IVA costa €150-€500.'
            }
          },
          {
            '@type': 'Question',
            'name': isEnglish ? 'How long does it take to start a business in Italy?' : 'Quanto tempo ci vuole per aprire un\'attività in Italia?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': isEnglish ? 'The complete process takes 4-6 weeks: 2 weeks for preparation, 1 day for notary incorporation, and 2-4 weeks for official registrations.' : 'Il processo completo richiede 4-6 settimane: 2 settimane per la preparazione, 1 giorno per la costituzione notarile e 2-4 settimane per le registrazioni ufficiali.'
            }
          },
          {
            '@type': 'Question',
            'name': isEnglish ? 'What are the best sectors for foreign entrepreneurs in Italy?' : 'Quali sono i settori migliori per imprenditori stranieri in Italia?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': isEnglish ? 'Top sectors include: commerce (25.5%), construction (21.6%), and personal services. Restaurants, retail, and professional services are particularly successful for foreigners.' : 'I settori migliori includono: commercio (25,5%), costruzioni (21,6%) e servizi alla persona. Ristoranti, retail e servizi professionali hanno particolare successo per gli stranieri.'
            }
          },
          {
            '@type': 'Question',
            'name': isEnglish ? 'Do I need to speak Italian to start a business?' : 'Devo parlare italiano per aprire un\'attività?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': isEnglish ? 'While helpful, you can start a business with English support. Many services, banks, and accountants work in English, especially in major cities.' : 'Sebbene utile, puoi aprire un\'attività con supporto in inglese. Molti servizi, banche e commercialisti lavorano in inglese, soprattutto nelle grandi città.'
            }
          }
        ]
      },
      // Organization Schema
      {
        '@type': 'Organization',
        '@id': 'https://yourbusinessinitaly.com#organization',
        'name': 'Your Business in Italy',
        'url': 'https://yourbusinessinitaly.com',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://yourbusinessinitaly.com/images/logo.png'
        },
        'description': isEnglish ? 'Professional services for foreigners starting businesses in Italy' : 'Servizi professionali per stranieri che aprono attività in Italia',
        'foundingDate': '2022',
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+39-XXX-XXXXXXX',
          'email': 'info@yourbusinessinitaly.com',
          'contactType': 'customer service',
          'availableLanguage': ['English', 'Italian', 'German']
        },
        'areaServed': {
          '@type': 'Country',
          'name': 'Italy'
        },
        'serviceType': ['Business Formation', 'VAT Registration', 'Tax Consulting', 'Accounting Services']
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={isEnglish ? "Start a Business in Italy 2025: Complete Guide for Foreigners" : "Aprire Attività in Italia 2025: Guida Completa per Stranieri"}
        description={isEnglish ? "Step-by-step guide to start a business in Italy in 2025. Learn about company formation, VAT registration, taxes, and legal requirements for foreigners." : "Guida passo dopo passo per aprire un'attività in Italia nel 2025. Costituzione società, partita IVA, tasse e requisiti legali per stranieri."}
        keywords="start business Italy, company formation Italy, open business Italy foreigner, Italian business registration, aprire attività Italia straniero"
        canonicalUrl={`/${lang}/pillar/how-to-start-business-in-italy-2025`}
        ogType="article"
        structuredData={structuredData}
        lang={lang}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Custom Header for Pillar Page - Minimalist Style */}
      <section className="relative isolate min-h-[60vh] flex items-center overflow-hidden bg-neutral-900 text-white py-20">
        {/* Background Image con blur */}
        <OptimizedImage
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Start Business in Italy"
          className="absolute inset-0 w-full h-full object-cover z-[1] blur-sm"
          priority={true}
          width={1920}
          height={1080}
        />
        {/* Overlay scuro con gradiente per contrasto */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/90 to-neutral-900/95 z-[2]"></div>
        {/* Overlay aggiuntivo per maggiore contrasto */}
        <div className="absolute inset-0 bg-black/50 z-[3]"></div>
        <div className="container mx-auto px-4 text-center relative z-[10]">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            {isEnglish ? "Complete Guide 2025" : "Guida Completa 2025"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
            {isEnglish ? "How to Start a Business in Italy 2025" : "Come Aprire un'Attività in Italia 2025"}
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-white/95 drop-shadow-md">
            {isEnglish ? "Complete Guide for Foreign Entrepreneurs" : "Guida Completa per Imprenditori Stranieri"}
          </p>
          <p className="text-lg mb-10 max-w-3xl mx-auto text-white/90 drop-shadow-sm">
            {isEnglish ?
              "Your comprehensive guide to starting a business in Italy. From choosing the right business structure to navigating Italian bureaucracy, we've got you covered." :
              "La tua guida completa per aprire un'attività in Italia. Dalla scelta della struttura aziendale alla navigazione della burocrazia italiana, ti copriamo noi."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/services/open-company-italy`} className="btn-primary text-lg py-4 px-8">
              {isEnglish ? "Get Started Today" : "Inizia Oggi"}
            </Link>
            <Link href={`/${lang}/contact`} className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/30 text-white font-medium rounded hover:bg-white/10 transition-colors">
              {isEnglish ? "Download Free Guide" : "Scarica Guida Gratuita"}
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Quick Navigation */}
        <div className="bg-white rounded border border-neutral-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            {isEnglish ? "Quick Navigation" : "Navigazione Rapida"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href={`/${lang}/services/open-company-italy`} className="block p-4 border border-neutral-200 rounded hover:border-primary hover:bg-primary/5 transition-colors group">
              <h3 className="font-semibold text-primary mb-2">{isEnglish ? "Open Company" : "Apri Società"}</h3>
              <p className="text-sm text-neutral-600">{isEnglish ? "SRL formation guide" : "Guida costituzione SRL"}</p>
            </Link>
            <Link href={`/${lang}/services/open-vat-number-italy`} className="block p-4 border border-neutral-200 rounded hover:border-primary hover:bg-primary/5 transition-colors group">
              <h3 className="font-semibold text-primary mb-2">{isEnglish ? "VAT Number" : "Partita IVA"}</h3>
              <p className="text-sm text-neutral-600">{isEnglish ? "Partita IVA registration" : "Registrazione Partita IVA"}</p>
            </Link>
            <Link href={`/${lang}/services/tax-accounting-expats`} className="block p-4 border border-neutral-200 rounded hover:border-primary hover:bg-primary/5 transition-colors group">
              <h3 className="font-semibold text-primary mb-2">{isEnglish ? "Tax & Accounting" : "Tasse & Contabilità"}</h3>
              <p className="text-sm text-neutral-600">{isEnglish ? "Tax services for expats" : "Servizi fiscali per stranieri"}</p>
            </Link>
            <Link href={`/${lang}/blog`} className="block p-4 border border-neutral-200 rounded hover:border-primary hover:bg-primary/5 transition-colors group">
              <h3 className="font-semibold text-primary mb-2">{isEnglish ? "All Articles" : "Tutti gli Articoli"}</h3>
              <p className="text-sm text-neutral-600">{isEnglish ? "Browse all guides" : "Sfoglia tutte le guide"}</p>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Choose Business Structure */}
            <section className="bg-white rounded border border-neutral-200 p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                {isEnglish ? "1. Choose Your Business Structure" : "1. Scegli la Tua Struttura Aziendale"}
              </h2>
              <p className="text-neutral-600 mb-6">
                {isEnglish ?
                  "The first step in starting a business in Italy is choosing the right legal structure. The most common options for foreigners are:" :
                  "Il primo passo per aprire un'attività in Italia è scegliere la struttura legale giusta. Le opzioni più comuni per gli stranieri sono:"}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-neutral-200 rounded p-4">
                  <h3 className="font-semibold text-primary mb-2">SRL (Società a Responsabilità Limitata)</h3>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• {isEnglish ? "Limited liability protection" : "Protezione responsabilità limitata"}</li>
                    <li>• {isEnglish ? "Minimum capital: €1" : "Capitale minimo: €1"}</li>
                    <li>• {isEnglish ? "Corporate tax rate: 24%" : "Aliquota imposta: 24%"}</li>
                    <li>• {isEnglish ? "Ideal for most businesses" : "Ideale per la maggior parte delle attività"}</li>
                  </ul>
                </div>
                <div className="border border-neutral-200 rounded p-4">
                  <h3 className="font-semibold text-primary mb-2">Partita IVA (Freelance/Self-employed)</h3>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• {isEnglish ? "No minimum capital required" : "Nessun capitale minimo richiesto"}</li>
                    <li>• {isEnglish ? "Flat tax rate: 15% (5% startup)" : "Tassa fissa: 15% (5% startup)"}</li>
                    <li>• {isEnglish ? "Simple administration" : "Amministrazione semplice"}</li>
                    <li>• {isEnglish ? "Perfect for consultants" : "Perfetto per consulenti"}</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <Link href={`/${lang}/services/open-company-italy`} className="text-primary hover:text-primary-dark font-semibold">
                  {isEnglish ? "→ Learn more about company formation" : "→ Scopri di più sulla costituzione di società"}
                </Link>
              </div>
            </section>

            {/* Step 2: VAT Registration */}
            <section className="bg-white rounded border border-neutral-200 p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                {isEnglish ? "2. Register for VAT Number (Partita IVA)" : "2. Registra la Partita IVA"}
              </h2>
              <p className="text-neutral-600 mb-6">
                {isEnglish ?
                  "Every business in Italy needs a VAT number, regardless of size or structure. This is your fiscal identification number." :
                  "Ogni attività in Italia ha bisogno di una partita IVA, indipendentemente dalle dimensioni o struttura. Questo è il tuo numero di identificazione fiscale."}
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded p-4">
                <h4 className="font-semibold text-primary mb-2">
                  {isEnglish ? "What you need:" : "Cosa ti serve:"}
                </h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>• {isEnglish ? "Valid ID document" : "Documento d'identità valido"}</li>
                  <li>• {isEnglish ? "Tax code (Codice Fiscale)" : "Codice fiscale"}</li>
                  <li>• {isEnglish ? "Address in Italy" : "Indirizzo in Italia"}</li>
                  <li>• {isEnglish ? "Business activity description" : "Descrizione dell'attività"}</li>
                </ul>
              </div>
              <div className="mt-6">
                <Link href={`/${lang}/services/open-vat-number-italy`} className="text-primary hover:text-primary-dark font-semibold">
                  {isEnglish ? "→ Get your VAT number now" : "→ Ottieni la tua partita IVA ora"}
                </Link>
              </div>
            </section>

            {/* Step 3: Company Formation */}
            <section className="bg-white rounded border border-neutral-200 p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                {isEnglish ? "3. Complete Company Formation" : "3. Completa la Costituzione della Società"}
              </h2>
              <p className="text-neutral-600 mb-6">
                {isEnglish ?
                  "If you've chosen to form a company (SRL), you'll need to complete the formal incorporation process with a notary." :
                  "Se hai scelto di costituire una società (SRL), dovrai completare il processo formale di costituzione con un notaio."}
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">{isEnglish ? "Notary Appointment" : "Appuntamento dal Notaio"}</h4>
                    <p className="text-neutral-600 text-sm">{isEnglish ? "Sign incorporation documents" : "Firma documenti di costituzione"}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">{isEnglish ? "Chamber of Commerce Registration" : "Registrazione Camera di Commercio"}</h4>
                    <p className="text-neutral-600 text-sm">{isEnglish ? "Business register filing" : "Iscrizione registro imprese"}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">{isEnglish ? "Tax Office Registration" : "Registrazione Ufficio Tributario"}</h4>
                    <p className="text-neutral-600 text-sm">{isEnglish ? "Tax authority notification" : "Comunicazione autorità fiscali"}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tax Information */}
            <section className="bg-white rounded border border-neutral-200 p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                {isEnglish ? "Understanding Italian Taxes" : "Capire le Tasse Italiane"}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-primary mb-2">{isEnglish ? "Corporate Tax (IRES)" : "Imposta Societaria (IRES)"}</h3>
                  <p className="text-neutral-700 text-sm mb-2">24% on company profits</p>
                  <p className="text-neutral-500 text-xs">{isEnglish ? "Regional tax (IRAP) additional 3.9%" : "Imposta regionale (IRAP) aggiuntiva 3,9%"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">{isEnglish ? "Personal Income Tax (IRPEF)" : "Imposta Reddito Persone Fisiche (IRPEF)"}</h3>
                  <p className="text-neutral-700 text-sm mb-2">Progressive: 23% to 43%</p>
                  <p className="text-neutral-500 text-xs">{isEnglish ? "Based on annual income" : "Basata sul reddito annuo"}</p>
                </div>
              </div>
              <div className="mt-6">
                <Link href={`/${lang}/services/tax-accounting-expats`} className="text-primary hover:text-primary-dark font-semibold">
                  {isEnglish ? "→ Get professional tax advice" : "→ Ottieni consulenza fiscale professionale"}
                </Link>
              </div>
            </section>

            {/* Related Articles */}
            <section className="bg-white rounded border border-neutral-200 p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                {isEnglish ? "Related Articles" : "Articoli Correlati"}
              </h2>
              <div className="space-y-4">
                <Link href={`/${lang}/blog/how-to-open-business-italy-foreigner-complete-guide-2025`} className="block p-4 border border-neutral-200 rounded hover:border-primary hover:bg-primary/5 transition-colors">
                  <h3 className="font-semibold text-neutral-900 mb-1">{isEnglish ? "How to Open a Business in Italy - Complete Guide 2025" : "Come Aprire un'Attività in Italia - Guida Completa 2025"}</h3>
                  <p className="text-neutral-600 text-sm">{isEnglish ? "Step-by-step guide for foreign entrepreneurs" : "Guida passo-passo per imprenditori stranieri"}</p>
                </Link>
                <Link href={`/${lang}/blog/aprire-partita-iva-freelance-italia-2025`} className="block p-4 border border-neutral-200 rounded hover:border-primary hover:bg-primary/5 transition-colors">
                  <h3 className="font-semibold text-neutral-900 mb-1">{isEnglish ? "How to Open Freelance VAT Number in Italy 2025" : "Come Aprire Partita IVA Freelance Italia 2025"}</h3>
                  <p className="text-neutral-600 text-sm">{isEnglish ? "Complete guide to VAT registration for freelancers" : "Guida completa alla registrazione IVA per freelance"}</p>
                </Link>
                <Link href={`/${lang}/blog/regime-forfettario-italia-2025-guida-completa`} className="block p-4 border border-neutral-200 rounded hover:border-primary hover:bg-primary/5 transition-colors">
                  <h3 className="font-semibold text-neutral-900 mb-1">{isEnglish ? "Italian Flat Tax Regime 2025: Complete Guide" : "Regime Forfettario Italia 2025: Guida Completa"}</h3>
                  <p className="text-neutral-600 text-sm">{isEnglish ? "Everything about the simplified tax regime for freelancers" : "Tutto sul regime fiscale semplificato per freelance"}</p>
                </Link>
                <Link href={`/${lang}/blog/tasse-di-una-srl-guida-2025-per-nuovi-imprenditori-stranieri`} className="block p-4 border border-neutral-200 rounded hover:border-primary hover:bg-primary/5 transition-colors">
                  <h3 className="font-semibold text-neutral-900 mb-1">{isEnglish ? "SRL Taxes and Costs in Italy 2025" : "Tasse e Costi SRL Italia 2025"}</h3>
                  <p className="text-neutral-600 text-sm">{isEnglish ? "Complete guide to SRL taxation and business costs" : "Guida completa alla tassazione SRL e costi aziendali"}</p>
                </Link>
                <Link href={`/${lang}/blog/regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia`} className="block p-4 border border-neutral-200 rounded hover:border-primary hover:bg-primary/5 transition-colors">
                  <h3 className="font-semibold text-neutral-900 mb-1">{isEnglish ? "Italian Tax Benefits for Foreign Entrepreneurs 2025" : "Regime Impatriati 2025 - Vantaggi Fiscali per Stranieri"}</h3>
                  <p className="text-neutral-600 text-sm">{isEnglish ? "Tax incentives and benefits for foreign professionals" : "Incentivi fiscali e benefici per professionisti stranieri"}</p>
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact CTA */}
            <div className="bg-primary/5 border border-primary/20 rounded p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                {isEnglish ? "Need Help?" : "Hai Bisogno di Aiuto?"}
              </h3>
              <p className="text-neutral-600 text-sm mb-4">
                {isEnglish ?
                  "Our experts can guide you through the entire process. Get a free consultation!" :
                  "I nostri esperti possono guidarti attraverso l'intero processo. Ottieni una consulenza gratuita!"}
              </p>
              <Link href={`/${lang}/contact`} className="block w-full btn-primary text-center">
                {isEnglish ? "Contact Us" : "Contattaci"}
              </Link>
            </div>

            {/* Download Guide */}
            <div className="bg-secondary/5 border border-secondary/20 rounded p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                {isEnglish ? "Free Business Guide" : "Guida Gratuita Business"}
              </h3>
              <p className="text-neutral-600 text-sm mb-4">
                {isEnglish ?
                  "Download our complete guide with all the information you need to start your business in Italy." :
                  "Scarica la nostra guida completa con tutte le informazioni necessarie per iniziare la tua attività in Italia."}
              </p>
              <Link href={`/${lang}/contact`} className="block w-full bg-secondary text-white text-center py-3 px-4 rounded hover:bg-secondary-light transition-colors font-medium">
                {isEnglish ? "Download Now" : "Scarica Ora"}
              </Link>
            </div>

            {/* Quick Facts */}
            <div className="bg-neutral-50 border border-neutral-200 rounded p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                {isEnglish ? "Quick Facts" : "Fatti Veloci"}
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>• {isEnglish ? "Processing time: 5-10 working days" : "Tempo di elaborazione: 5-10 giorni lavorativi"}</li>
                <li>• {isEnglish ? "Minimum capital: €1 for SRL" : "Capitale minimo: €1 per SRL"}</li>
                <li>• {isEnglish ? "English language support available" : "Supporto in lingua inglese disponibile"}</li>
                <li>• {isEnglish ? "Online process assistance" : "Assistenza processo online"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PillarBusinessItaly;
