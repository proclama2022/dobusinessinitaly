import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEOHead from '@/components/SEOHead';

const CookiePolicy = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('cookies.policy.title')} - Dobusinessinitaly.com`;
  }, [t]);

  return (
    <>
      <SEOHead 
        title={`${t('cookies.policy.title')} - Dobusinessinitaly.com`}
        description={t('cookies.policy.intro')}
        canonicalUrl="/cookie-policy"
      />
      
      <main className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{
              label: t('navigation.home'),
              path: '/'
            }, {
              label: t('cookies.policy.title'),
              path: '/cookie-policy',
              isLast: true
            }]} />
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#009246] to-[#00b956] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {t('cookies.policy.title')}
              </h1>
              <p className="text-lg text-green-100 mb-4">
                {t('cookies.policy.intro')}
              </p>
              <p className="text-sm text-green-200">
                {t('cookies.policy.lastUpdated')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              
              {/* What are Cookies */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-[#009246]">
                  {t('cookies.policy.whatAreCookies.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('cookies.policy.whatAreCookies.content')}
                </p>
              </section>

              {/* How We Use Cookies */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-[#009246]">
                  {t('cookies.policy.howWeUseCookies.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('cookies.policy.howWeUseCookies.content')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  {(t('cookies.policy.howWeUseCookies.reasons', { returnObjects: true }) as string[]).map((reason: string, index: number) => (
                    <li key={index} className="leading-relaxed">{reason}</li>
                  ))}
                </ul>
              </section>

              {/* Types of Cookies */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b-2 border-[#009246]">
                  {t('cookies.policy.typesOfCookies.title')}
                </h2>
                
                <div className="space-y-6">
                  {/* Necessary Cookies */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <i className="fas fa-shield-alt text-[#009246]"></i>
                      {t('cookies.policy.typesOfCookies.necessary.title')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('cookies.policy.typesOfCookies.necessary.description')}
                    </p>
                  </div>

                  {/* Performance Cookies */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <i className="fas fa-chart-line text-[#009246]"></i>
                      {t('cookies.policy.typesOfCookies.performance.title')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('cookies.policy.typesOfCookies.performance.description')}
                    </p>
                  </div>

                  {/* Functionality Cookies */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <i className="fas fa-cogs text-[#009246]"></i>
                      {t('cookies.policy.typesOfCookies.functionality.title')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('cookies.policy.typesOfCookies.functionality.description')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Managing Cookies */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-[#009246]">
                  {t('cookies.policy.manageCookies.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('cookies.policy.manageCookies.content')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  {(t('cookies.policy.manageCookies.methods', { returnObjects: true }) as string[]).map((method: string, index: number) => (
                    <li key={index} className="leading-relaxed">{method}</li>
                  ))}
                </ul>
                
                {/* Cookie Settings Button */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-cog text-[#009246] text-xl"></i>
                    <div className="flex-1">
                      <p className="text-gray-700 font-medium mb-1">
                        Gestisci le tue preferenze cookie
                      </p>
                      <p className="text-sm text-gray-600">
                        Puoi modificare le tue preferenze sui cookie in qualsiasi momento
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        // Rimuove il consenso esistente per mostrare di nuovo il banner
                        localStorage.removeItem('cookieConsent');
                        window.location.reload();
                      }}
                      className="px-4 py-2 bg-[#009246] text-white rounded hover:bg-[#007a3a] transition-colors duration-200 text-sm font-medium"
                    >
                      Gestisci Cookie
                    </button>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-[#009246]">
                  {t('cookies.policy.contact.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('cookies.policy.contact.content')}
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CookiePolicy; 