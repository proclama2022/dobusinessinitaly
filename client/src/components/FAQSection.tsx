import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useLocalizedPath } from '@/components/LocalizedRouter';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Quanto costa aprire una società in Italia per stranieri?",
    answer: "I costi per aprire una società in Italia variano da 1.500€ a 3.000€ per una SRL, includendo notaio, Camera di Commercio, e consulenza iniziale. Per una partita IVA i costi sono molto più contenuti (300-800€). Offriamo preventivi gratuiti personalizzati in base alle vostre esigenze specifiche."
  },
  {
    question: "Posso aprire partita IVA in Italia se sono straniero?",
    answer: "Sì, i cittadini UE possono aprire partita IVA liberamente in Italia. I cittadini extra-UE necessitano di permesso di soggiorno per lavoro autonomo. Vi assistiamo in tutto il processo burocratico, dalla richiesta dei documenti alla presentazione delle pratiche."
  },
  {
    question: "Cos'è il regime forfettario e chi può accedervi?",
    answer: "Il regime forfettario è un regime fiscale agevolato con tassa al 5% (primi 5 anni) o 15% per fatturati fino a 85.000€ annui. È ideale per freelance e piccole imprese. Non si applica IVA e la contabilità è semplificata. Perfetto per chi inizia un'attività in Italia."
  },
  {
    question: "Offrite consulenza in inglese?",
    answer: "Sì, offriamo consulenza principalmente in inglese e, grazie alle nostre competenze nelle tecnologie AI, possiamo comunicare efficacemente nella lingua madre del cliente. Il nostro team ha esperienza specifica con clienti internazionali."
  },
  {
    question: "Quanto tempo ci vuole per aprire una società?",
    answer: "Per una SRL servono generalmente 15-30 giorni lavorativi dal momento in cui abbiamo tutta la documentazione. Per una partita IVA i tempi sono molto più rapidi: 3-7 giorni. I tempi possono variare in base alla complessità del caso e alla nazionalità del richiedente."
  },
  {
    question: "Che documenti servono per aprire un'attività in Italia?",
    answer: "Per cittadini UE: documento d'identità valido e codice fiscale. Per cittadini extra-UE: passaporto, permesso di soggiorno (o richiesta), codice fiscale. Per le società servono anche statuti, atti costitutivi e documentazione specifica che vi aiuteremo a preparare."
  }
];

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { getLocalizedPath } = useLocalizedPath();

  // Generate FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="section-padding bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData)
        }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Domande Frequenti</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Le risposte alle domande più comuni sui nostri servizi per stranieri che vogliono fare business in Italia
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  aria-expanded={openItems.includes(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Non trovi la risposta che cerchi?
            </p>
            <a 
              href={getLocalizedPath('/contact')} 
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Contattaci per una Consulenza Gratuita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
