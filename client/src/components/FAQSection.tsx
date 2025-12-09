import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '@/components/LocalizedRouter';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  // Get FAQ data from translations
  const faqItems = (t('faq.items', { returnObjects: true }) as FAQItem[]) || [];
  const faqTitle = t('faq.title', 'Frequently Asked Questions');
  const faqSubtitle = t('faq.subtitle', 'Answers to the most common questions');
  const faqNotFound = t('faq.notFound', "Can't find the answer you're looking for?");
  const faqCtaButton = t('faq.ctaButton', 'Contact Us for a Free Consultation');

  // Generate FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
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
            <h2 className="section-title mb-4">{faqTitle}</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {faqSubtitle}
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
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
              {faqNotFound}
            </p>
            <a 
              href={getLocalizedPath('/contact')} 
              className="inline-flex items-center px-6 py-3 bg-italian-green text-white font-semibold rounded-sm hover:bg-italian-green-dark transition-colors shadow-sm hover:shadow-md"
            >
              {faqCtaButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
