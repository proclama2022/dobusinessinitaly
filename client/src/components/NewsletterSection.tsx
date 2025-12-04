import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const NewsletterSection = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest('/api/newsletter', { method: 'POST', body: { email } });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: t('newsletter.success.title'),
        description: t('newsletter.success.message'),
        variant: 'default',
      });
      setEmail('');
    },
    onError: (error) => {
      toast({
        title: t('newsletter.error.title'),
        description: error instanceof Error ? error.message : t('newsletter.error.message'),
        variant: 'destructive',
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    mutate(email);
  };

  return (
    <section className="section-padding relative overflow-hidden bg-neutral-900">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded p-8 md:p-12 shadow-2xl overflow-hidden">
            
            <div className="relative z-10 text-center mb-10">
              <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <FontAwesomeIcon icon={faEnvelope} className="text-white text-2xl" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('newsletter.title')}
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                {t('newsletter.subtitle')}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="relative group">
                <div className="relative flex flex-col md:flex-row gap-0 bg-white rounded overflow-hidden">
                  <input 
                    type="email" 
                    placeholder={t('newsletter.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-6 py-4 bg-transparent focus:outline-none text-neutral-900 placeholder-neutral-500" 
                    required
                  />
                  <button 
                    type="submit" 
                    className="px-8 py-4 bg-primary text-white font-bold text-sm uppercase tracking-widest hover:bg-primary-light transition-colors duration-300 flex items-center justify-center gap-2 md:w-auto w-full"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="animate-pulse">Subscribing...</span>
                    ) : (
                      <>
                        {t('newsletter.subscribe')}
                        <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="mt-6 text-center text-gray-400 text-xs">
                <p>{t('newsletter.privacy')}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
