import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import NextGenImage from './NextGenImage'; // Importa il componente NextGenImage

type TestimonialProps = {
  imgSrc: string;
  quote: string;
  name: string;
  position: string;
  isActive: boolean;
};

const Testimonial = ({ imgSrc, quote, name, position, isActive }: TestimonialProps) => {
  return (
    <div className={`testimonial-slide ${isActive ? 'active' : ''}`}>
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <NextGenImage 
              src={imgSrc} 
              alt={`${name} portrait`} 
              width={80} 
              height={80} 
              className="w-20 h-20 rounded-full object-cover mx-auto md:mx-0"
            />
          </div>
          <div className="md:ml-6 text-center md:text-left">
            <div className="mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <i key={star} className="fas fa-star text-secondary"></i>
              ))}
            </div>
            <blockquote className="text-neutral-700 italic mb-4">
              "{quote}"
            </blockquote>
            <div>
              <h4 className="font-heading font-medium text-lg text-neutral-800">{name}</h4>
              <p className="text-neutral-600">{position}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      imgSrc: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: t('testimonials.items.0.quote'),
      name: t('testimonials.items.0.name'),
      position: t('testimonials.items.0.position')
    },
    {
      imgSrc: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: t('testimonials.items.1.quote'),
      name: t('testimonials.items.1.name'),
      position: t('testimonials.items.1.position')
    },
    {
      imgSrc: 'https://randomuser.me/api/portraits/men/75.jpg',
      quote: t('testimonials.items.2.quote'),
      name: t('testimonials.items.2.name'),
      position: t('testimonials.items.2.position')
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="section-padding bg-neutral-50 relative overflow-hidden">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="section-title mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-neutral-700 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden min-h-[280px] sm:min-h-[350px]">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                imgSrc={testimonial.imgSrc}
                quote={testimonial.quote}
                name={testimonial.name}
                position={testimonial.position}
                isActive={index === currentSlide}
              />
            ))}
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm text-primary border border-neutral-200 hover:bg-neutral-50 transition-all z-10"
            aria-label={t('testimonials.previous')}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm text-primary border border-neutral-200 hover:bg-neutral-50 transition-all z-10"
            aria-label={t('testimonials.next')}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentSlide ? 'bg-primary' : 'bg-neutral-300'
                } hover:bg-primary transition-colors duration-200`}
                aria-label={`${t('testimonials.goToSlide')} ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
