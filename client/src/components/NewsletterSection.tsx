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
      const response = await apiRequest('POST', '/api/newsletter', { email });
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
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-primary rounded-lg p-8 md:p-12 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-semibold text-white mb-4">
              {t('newsletter.title')}
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              {t('newsletter.subtitle')}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <input 
                  type="email" 
                  placeholder={t('newsletter.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-md focus:outline-none" 
                  required
                />
              </div>
              <button 
                type="submit" 
                className="bg-secondary hover:bg-secondary-light text-neutral-900 font-medium py-3 px-6 rounded-md transition duration-300 disabled:opacity-70"
                disabled={isPending}
              >
                {isPending ? t('newsletter.subscribing') : t('newsletter.subscribe')}
              </button>
            </div>
            <div className="mt-4 text-center text-white/70 text-sm">
              <p>{t('newsletter.privacy')}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
