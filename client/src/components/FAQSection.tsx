import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/components/LocalizedRouter';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First open by default
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rawFaqItems = t('faq.items', { returnObjects: true });
  const faqItems = Array.isArray(rawFaqItems) ? (rawFaqItems as FAQItem[]) : [];

  // FAQ Schema
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  // GSAP animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('.faq-item');
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { x: i % 2 === 0 ? -30 : 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item as Element,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.05
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [faqItems]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Accordion height animation
  useEffect(() => {
    contentRefs.current.forEach((content, index) => {
      if (!content) return;
      if (openItems.includes(index)) {
        gsap.to(content, {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      } else {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    });
  }, [openItems]);

  if (faqItems.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 mesh-gradient-italian opacity-30" />

      {/* Decorative */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-italian-green rounded-full" />
      <div className="absolute top-32 left-28 w-1 h-1 bg-gold rounded-full" />
      <div className="absolute bottom-40 right-32 w-3 h-3 bg-italian-red/50 rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left - Header (NOT centered) */}
          <div className="lg:w-[35%] lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-px bg-gold" />
              <span className="text-gold font-accent text-xs font-semibold uppercase tracking-[0.25em]">
                FAQ
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-navy font-display leading-[1.1] mb-6">
              Frequently Asked{' '}
              <span className="italic text-italian-green">Questions</span>
            </h2>

            <p className="text-navy/60 font-body max-w-sm mb-10">
              {t('faq.subtitle', 'Answers to the most common questions about doing business in Italy.')}
            </p>

            {/* CTA */}
            <Link href={getLocalizedPath('/contact')}>
              <button className="btn-luxury-outline border-navy/30 text-navy hover:text-white flex items-center gap-3 px-6 py-3 text-xs font-bold uppercase tracking-wider">
                {t('faq.ctaButton', 'Contact Us')}
                <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
              </button>
            </Link>
          </div>

          {/* Right - Accordion */}
          <div className="lg:w-[65%]">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />

            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className={cn(
                    'faq-item border transition-all duration-300',
                    openItems.includes(index)
                      ? 'bg-white border-neutral-200 shadow-lg rounded-2xl'
                      : 'bg-neutral-50 border-transparent rounded-xl hover:bg-white hover:border-neutral-200'
                  )}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center group"
                    aria-expanded={openItems.includes(index)}
                  >
                    <h3
                      className={cn(
                        'font-headline font-semibold pr-6 transition-colors',
                        openItems.includes(index) ? 'text-navy text-lg' : 'text-navy/80'
                      )}
                    >
                      {faq.question}
                    </h3>

                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300',
                        openItems.includes(index)
                          ? 'bg-italian-green text-white rotate-180'
                          : 'bg-neutral-100 text-navy/40 group-hover:bg-italian-green/10 group-hover:text-italian-green'
                      )}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </button>

                  <div
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    className="overflow-hidden"
                    style={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-8 pb-6">
                      <p className="text-navy/70 leading-relaxed font-body text-sm border-t border-neutral-100 pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Not found? */}
            <div className="mt-12 p-6 bg-cream rounded-2xl">
              <p className="text-navy/60 font-body text-sm">
                {t('faq.notFound', "Can't find the answer you're looking for?")}
              </p>
              <Link href={getLocalizedPath('/contact')} className="text-italian-green font-bold text-sm hover:underline mt-2 inline-block">
                Contact our team →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
