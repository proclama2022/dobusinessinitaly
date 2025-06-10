import React, { useState } from 'react';
import { Link } from 'wouter';
import { getLocalizedLeadMagnet, LocalizedLeadMagnet } from '../config/leadMagnets';
import { useTranslation } from 'react-i18next';

interface DownloadGuideFormProps {
  leadMagnetType: string;
  currentLanguage?: string;
  blogPost?: {
    slug: string;
    title: string;
  };
}

const DownloadGuideForm: React.FC<DownloadGuideFormProps> = ({ 
  leadMagnetType, 
  currentLanguage = 'it',
  blogPost 
}) => {
  const { t, i18n } = useTranslation();
  
  // Usa la lingua dal contesto i18n invece della prop se disponibile
  const effectiveLanguage = i18n.language || currentLanguage;
  
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const leadMagnet = getLocalizedLeadMagnet(leadMagnetType, effectiveLanguage);
  
  // Debug per verificare la lingua corrente (da rimuovere in produzione)
  console.log('[DownloadGuideForm] effectiveLanguage:', effectiveLanguage, 'leadMagnet:', leadMagnet?.title);

  // Se non esiste la guida per questo tipo, non mostrare nulla
  if (!leadMagnet) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Verifica che l'utente abbia accettato la privacy policy
    if (!acceptPrivacy) {
      setError(t('downloadGuide.privacyRequired', 'Devi accettare la privacy policy per continuare.'));
      return;
    }

    setIsSubmitting(true);

    try {
      // Genera l'URL del blog post se disponibile
      const blogUrl = blogPost ? 
        `${window.location.origin}/blog/${blogPost.slug}` : 
        window.location.href;

      const response = await fetch('/api/download-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          guideType: leadMagnetType,
          language: effectiveLanguage,
          blogUrl: blogUrl,
          blogTitle: blogPost?.title || document.title
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail('');
        setAcceptPrivacy(false);
      } else {
        throw new Error(t('downloadGuide.errorMessage'));
      }
    } catch (err) {
      setError(t('downloadGuide.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
          <section className="py-20 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
      {/* Decorazioni di sfondo */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#009246] via-white to-[#ce2b37]"></div>
      <div className="absolute top-0 left-0 w-1 h-full bg-[#009246]"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-[#ce2b37]"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center relative overflow-hidden">
            {/* Cerchio decorativo di successo */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#009246] to-[#38a169] flex items-center justify-center shadow-lg">
              <i className="fas fa-check text-3xl text-white"></i>
            </div>
            
            <h3 className="text-3xl font-heading font-bold text-[#009246] mb-6">
              {t('downloadGuide.successTitle')}
            </h3>
            <p className="text-lg text-neutral-600 leading-relaxed">
              {t('downloadGuide.successMessage')}
            </p>
            
            {/* Bordo decorativo inferiore */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#009246] to-[#ce2b37]"></div>
          </div>
        </div>
      </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
      {/* Decorazioni di sfondo */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#009246] via-white to-[#ce2b37]"></div>
      <div className="absolute top-0 left-0 w-1 h-full bg-[#009246]"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-[#ce2b37]"></div>
      
      {/* Pattern decorativo */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23009246\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
      ></div>

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header sezione */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-[#00924615] text-[#009246] text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#009246] mr-3"></span>
              Risorsa Gratuita
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-[#009246]">Scarica la </span>
              <span className="relative">
                Guida Completa
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#009246] to-[#ce2b37]"></span>
              </span>
            </h2>
          </div>

          {/* Card form principale */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 md:p-12 relative overflow-hidden">
            {/* Icona decorativa */}
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#009246] to-[#38a169] flex items-center justify-center shadow-lg opacity-20">
              <i className="fas fa-download text-lg text-white"></i>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-heading font-bold text-neutral-800 mb-4">
                📋 {leadMagnet.title}
              </h3>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {leadMagnet.description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="email" className="block text-base font-semibold text-neutral-700 mb-3">
                  {t('downloadGuide.emailLabel')}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-5 py-4 pl-14 border-2 border-neutral-200 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-[#009246]/30 focus:border-[#009246] transition-all text-lg"
                    placeholder={t('downloadGuide.emailPlaceholder')}
                    disabled={isSubmitting}
                  />
                  <i className="fas fa-envelope absolute left-5 top-1/2 transform -translate-y-1/2 text-neutral-400 text-lg"></i>
                </div>
              </div>

              {/* Checkbox di consenso privacy */}
              <div className="flex items-start space-x-4 p-5 bg-neutral-50 rounded-xl">
                <input
                  type="checkbox"
                  id="acceptPrivacy"
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  className="mt-1 h-5 w-5 text-[#009246] border-neutral-300 rounded focus:ring-[#009246] focus:ring-2"
                  disabled={isSubmitting}
                />
                <label htmlFor="acceptPrivacy" className="text-base text-neutral-600 cursor-pointer leading-relaxed">
                  {t('downloadGuide.privacyAccept', 'Accetto la')}{' '}
                  <Link 
                    href="/privacy-policy" 
                    className="text-[#009246] hover:text-[#007a3a] underline font-medium"
                    target="_blank"
                  >
                    {t('downloadGuide.privacyPolicyText', 'Privacy Policy')}
                  </Link>
                  {' '}{t('downloadGuide.privacyAcceptEnd', 'e acconsento al trattamento dei miei dati personali.')}
                </label>
              </div>

              {error && (
                <div className="p-3 bg-[#ce2b3715] border border-[#ce2b37] rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-exclamation-triangle text-[#ce2b37] mr-2"></i>
                    <span className="text-[#ce2b37] text-sm">{error}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !acceptPrivacy}
                className="w-full bg-gradient-to-r from-[#009246] to-[#38a169] text-white py-5 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#009246]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t('downloadGuide.sendingButton')}</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-download"></i>
                    <span>{t('downloadGuide.downloadButton')}</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-500 mb-4">
                {t('downloadGuide.privacyNote')}
              </p>
              <Link 
                href="/privacy-policy" 
                className="inline-flex items-center text-sm text-[#009246] hover:text-[#007a3a] transition-colors"
              >
                <i className="fas fa-shield-alt mr-2"></i>
                {t('downloadGuide.privacyPolicyLink', 'Leggi la Privacy Policy')}
              </Link>
            </div>

            {/* Bordo decorativo inferiore */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#009246] to-[#ce2b37]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadGuideForm; 