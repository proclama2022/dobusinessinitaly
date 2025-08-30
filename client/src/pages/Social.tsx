import React, { useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import ContactSection from '@/components/ContactSection';
import { useTranslation } from 'react-i18next';
import { featuredLinkedinPosts } from '@/data/featuredLinkedin';
import { featuredVideos } from '@/data/featuredVideos';
import OptimizedImage from '@/components/OptimizedImage';

const linkedinProfileUrl = 'https://www.linkedin.com/in/studioemmicommercialista/';
const linkedinActivityUrl = `${linkedinProfileUrl}recent-activity/`;
const youtubeChannelUrl = 'https://www.youtube.com/channel/UCggYXro7p7chs4MvrMcLSvg/videos';

const Social = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    // Load LinkedIn badge script once when component mounts
    const existing = document.querySelector('script[src="https://platform.linkedin.com/badges/js/profile.js"]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://platform.linkedin.com/badges/js/profile.js';
      s.async = true;
      s.defer = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <>
      <SEOHead
        title={t('socialPage.title', 'Social & Video - Yourbusinessinitaly.com')}
        description={t('socialPage.description', 'Approfondimenti e contenuti social per conoscerci meglio: segui i post LinkedIn di Giovanni Emmi e scopri i video più utili del nostro canale YouTube.')}
        canonicalUrl={`/${currentLang}/social`}
        keywords="social, linkedin, youtube, partitaiva, yourbusinessinitaly"
        lang={currentLang}
        alternates={{
          it: 'https://yourbusinessinitaly.com/it/social',
          en: 'https://yourbusinessinitaly.com/en/social',
          fr: 'https://yourbusinessinitaly.com/fr/social',
          de: 'https://yourbusinessinitaly.com/de/social',
          es: 'https://yourbusinessinitaly.com/es/social',
          'x-default': 'https://yourbusinessinitaly.com/it/social'
        }}
      />

      {/* Hero Section */}
      <section className="relative isolate h-[500px] md:h-[600px] overflow-hidden">
        {/* Background con immagine e overlay sfumato */}
        <div className="absolute inset-0 bg-black opacity-50 z-[2]"></div>
        <OptimizedImage
          src="https://images.unsplash.com/photo-1611224923853-80b023f02d71"
          alt="Social media e video content"
          className="absolute inset-0 w-full h-full scale-105 animate-slow-zoom z-[1]"
          priority={true}
          width={1920}
          height={1080}
          sizes="100vw"
          quality={85}
        />
        
        {/* Contenuto Hero */}
        <div className="absolute inset-0 z-[3] flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                {t('socialPage.heading', 'Social & Video')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                {t('socialPage.lead', 'Una selezione di contenuti per conoscerci meglio e aumentare la fiducia: profilo LinkedIn di Giovanni Emmi e i video più utili del nostro canale YouTube.')}
              </p>
              <div className="flex items-center justify-center gap-4">
                <a href={linkedinProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 rounded-md bg-[#0A66C2] text-white font-semibold hover:scale-105 transition-transform">
                  <i className="fab fa-linkedin-in mr-2 text-lg"></i>
                  LinkedIn
                </a>
                <a href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 rounded-md bg-[#FF0000] text-white font-semibold hover:scale-105 transition-transform">
                  <i className="fab fa-youtube mr-2 text-lg"></i>
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gradiente italiano decorativo in basso */}
        <div className="absolute bottom-0 left-0 right-0 h-2 italian-gradient z-[4]"></div>
      </section>

      {/* LinkedIn Section */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
        {/* Pattern di sfondo */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23009246\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Contenuto testo */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#0A66C2] rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <i className="fab fa-linkedin-in text-white text-xl"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold italian-text-gradient">{t('socialPage.linkedinTitle', 'LinkedIn · Giovanni Emmi')}</h2>
                  <div className="h-1 w-20 italian-gradient mt-2"></div>
                </div>
              </div>
              
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                {t('socialPage.linkedinDesc', 'Seguici su LinkedIn per aggiornamenti professionali e riflessioni sul mondo fiscale e d\'impresa in Italia.')}
              </p>

              <div className="mb-6">
                <div className="badge-base LI-profile-badge" data-locale="it_IT" data-size="medium" data-theme="light" data-type="HORIZONTAL" data-vanity="studioemmicommercialista" data-version="v1">
                  <a className="badge-base__link LI-simple-link" href={linkedinProfileUrl} target="_blank" rel="noopener noreferrer">{t('socialPage.linkedinCta', 'Visita il profilo')}</a>
                </div>
              </div>

              <a href={linkedinActivityUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-[#0A66C2] text-white rounded-md hover:scale-105 transition-transform font-semibold">
                <i className="fas fa-external-link-alt mr-2"></i>
                {t('socialPage.linkedinButton', 'Vedi ultimi post')}
              </a>

              {/* Featured posts list */}
              {featuredLinkedinPosts.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-heading font-semibold mb-4">{t('socialPage.linkedinFeaturedTitle', 'Post in evidenza')}</h3>
                  <ul className="space-y-3">
                    {featuredLinkedinPosts.map((p) => (
                      <li key={p.url} className="group">
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start p-4 rounded-lg border border-neutral-200 hover:border-[#0A66C2] hover:bg-gradient-to-r hover:from-[#009246]/5 hover:to-[#ce2b37]/5 transition-all duration-300 hover:shadow-md"
                        >
                          <i className="fab fa-linkedin-in text-[#0A66C2] mt-1 mr-3 text-lg"></i>
                          <span className="text-neutral-800 group-hover:text-[#0A66C2] font-medium">{p.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Immagine decorativa */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                {/* Overlay con gradiente italiano al hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-[#009246] via-white to-[#ce2b37] transition-opacity duration-500 z-10"></div>
                
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71"
                  alt="LinkedIn professional networking"
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  width={600}
                  height={400}
                />
                
                {/* Badge decorativo */}
                <div className="absolute top-4 right-4 px-3 py-2 bg-white/90 backdrop-blur-sm text-sm font-semibold text-[#0A66C2] rounded-full shadow-sm">
                  <i className="fab fa-linkedin-in mr-1"></i> LinkedIn
                </div>
                
                {/* Bordi decorativi */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#009246] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ce2b37] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Pattern di sfondo alternato */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ce2b37\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'m0 40 40-40h-40v40zm40 0v-40h-40l40 40z\'/%3E%3C/g%3E%3C/svg%3E")' }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            {/* Contenuto testo */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#FF0000] rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <i className="fab fa-youtube text-white text-xl"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold italian-text-gradient">{t('socialPage.youtubeTitle', 'YouTube · Video consigliati')}</h2>
                  <div className="h-1 w-20 italian-gradient mt-2"></div>
                </div>
              </div>
              
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                {t('socialPage.youtubeDesc', 'Selezioniamo i video più utili per chi vuole fare impresa in Italia.')}
              </p>

              <div className="p-6 bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 rounded-xl mb-6 hover:shadow-md transition-shadow">
                <p className="text-neutral-700 mb-4">{t('socialPage.youtubeOnlyChannel', 'Mostriamo esclusivamente i video del canale ufficiale.')}</p>
                <a href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-[#FF0000] text-white rounded-md hover:scale-105 transition-transform font-semibold">
                  <i className="fas fa-external-link-alt mr-2"></i>
                  {t('socialPage.youtubeButton', 'Vai al canale YouTube')}
                </a>
              </div>
              
              {/* Video principale */}
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/PG2aGUyeFlQ"
                  title="Video più recente dal canale"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            {/* Video grid */}
            <div className="w-full lg:w-1/2">
              {featuredVideos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredVideos.slice(0, 4).map((v) => (
                    <div key={v.id} className="group relative">
                      <div className="aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                        {/* Overlay con gradiente italiano al hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-tr from-[#009246] via-white to-[#ce2b37] transition-opacity duration-500 z-10 rounded-xl"></div>
                        
                        <iframe
                          className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-300"
                          src={`https://www.youtube.com/embed/${v.id}`}
                          title={v.title || 'YouTube video'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                        
                        {/* Badge YouTube */}
                        <div className="absolute top-2 right-2 w-8 h-6 bg-[#FF0000] rounded-sm flex items-center justify-center opacity-80">
                          <i className="fab fa-youtube text-white text-xs"></i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
};

export default Social;