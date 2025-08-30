import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

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
    <section className="section-padding bg-neutral-100 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto card p-8 md:p-12">
          <div className="relative z-10">
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="section-title mb-4">
                {t('newsletter.title')}
              </h2>
              <p className="text-neutral-700 max-w-2xl mx-auto">
                {t('newsletter.subtitle')}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto animate-slide-up">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <input 
                    type="email" 
                    placeholder={t('newsletter.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-md focus:outline-none border border-neutral-300 focus:border-primary transition-colors shadow-sm" 
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-primary disabled:opacity-70"
                  disabled={isPending}
                >
                  {isPending ? t('newsletter.subscribing') : t('newsletter.subscribe')}
                </button>
              </div>
              <div className="mt-4 text-center text-neutral-600 text-sm">
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
