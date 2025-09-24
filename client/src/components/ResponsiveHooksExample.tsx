import React, { useRef } from 'react';
import {
  useWindowSize,
  useDeviceType,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsLandscape,
  useViewportHeight,
  useResponsiveFontSize,
  useIsInViewport,
  responsiveUtils,
} from '@/utils/responsive';

const ResponsiveHooksExample = () => {
  // Basic responsive hooks
  const { width, height } = useWindowSize();
  const deviceType = useDeviceType();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const isLandscape = useIsLandscape();
  const viewportHeight = useViewportHeight();

  // Responsive values
  const fontSize = useResponsiveFontSize(16, 18, 20);
  const heroFontSize = useResponsiveFontSize(32, 48, 64);

  // Intersection observer for animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInViewport = useIsInViewport(sectionRef);

  // Calculate responsive values
  const optimalColumns = responsiveUtils.getOptimalColumns(width);
  const spacing = responsiveUtils.calculateSpacing(16, width);

  // Demo data for responsive grid
  const demoItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Elemento ${i + 1}`,
    description: `Descrizione per l'elemento ${i + 1}`,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with viewport info */}
      <header className="bg-white shadow-sm p-4 mb-6">
        <div className="container">
          <h1 className="text-2xl font-bold mb-4">Demo Responsive Hooks</h1>

          {/* Viewport information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Dimensioni Viewport</h3>
              <p className="text-blue-700">
                Larghezza: {width}px<br />
                Altezza: {height}px
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Tipo Dispositivo</h3>
              <p className="text-green-700">
                {deviceType.toUpperCase()}<br />
                Orientamento: {isLandscape ? 'Landscape' : 'Portrait'}
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Breakpoint Attivo</h3>
              <p className="text-purple-700">
                Mobile: {isMobile ? '✓' : '✗'}<br />
                Tablet: {isTablet ? '✓' : '✗'}<br />
                Desktop: {isDesktop ? '✓' : '✗'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section with responsive font size */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 mb-8">
        <div className="container text-center">
          <h2
            className="font-bold mb-4"
            style={{ fontSize: `${heroFontSize}px` }}
          >
            Font Size Responsive
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{ fontSize: `${fontSize}px` }}
          >
            Questo testo adatta la sua dimensione in base al viewport.
            Dimensione attuale: {fontSize}px
          </p>
        </div>
      </section>

      {/* Responsive grid demonstration */}
      <section className="container mb-8">
        <h2 className="text-2xl font-bold mb-4">Griglia Responsive</h2>
        <p className="mb-4">
          Numero ottimale di colonne: {optimalColumns}
        </p>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${optimalColumns}, 1fr)`,
            gap: `${spacing}px`
          }}
        >
          {demoItems.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Device-specific content */}
      <section className="container mb-8">
        <h2 className="text-2xl font-bold mb-4">Contenuto Specifico per Dispositivo</h2>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          {isMobile && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-700">
                📱 Contenuto ottimizzato per mobile: Interfaccia semplificata e touch-friendly
              </p>
            </div>
          )}

          {isTablet && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-700">
                📋 Contenuto ottimizzato per tablet: Layout a due colonne e navigazione avanzata
              </p>
            </div>
          )}

          {isDesktop && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <p className="text-green-700">
                💻 Contenuto ottimizzato per desktop: Interfaccia completa con funzionalità avanzate
              </p>
            </div>
          )}

          <div className="text-center">
            <p className="text-lg mb-4">Viewport Height: {viewportHeight}px</p>
            <p className="text-gray-600">
              Altezza utile considerando la barra degli indirizzi del browser mobile
            </p>
          </div>
        </div>
      </section>

      {/* Intersection Observer Demo */}
      <section
        ref={sectionRef}
        className={`container mb-8 transition-all duration-1000 ${
          isInViewport ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Intersection Observer Demo</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="mb-4">
            Stato: {isInViewport ? '✅ Visibile nel viewport' : '❌ Non visibile'}
          </p>
          <p className="text-gray-600">
            Questa sezione utilizza l'hook useIsInViewport per attivare animazioni
            quando l'elemento entra nell'area visibile dello schermo.
          </p>
        </div>
      </section>

      {/* Responsive Images Demo */}
      <section className="container mb-8">
        <h2 className="text-2xl font-bold mb-4">Immagini Responsive</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(id => (
            <div key={id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">
                  Immagine {id} ({width >= 768 ? 'Desktop' : 'Mobile'})
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Immagine Responsive {id}</h3>
                <p className="text-sm text-gray-600">
                  Larghezza contenitore: {Math.min(width, 400)}px
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Responsive Form Demo */}
      <section className="container mb-8">
        <h2 className="text-2xl font-bold mb-4">Form Responsive</h2>

        <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Inserisci il tuo nome"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Inserisci la tua email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Messaggio
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Inserisci il tuo messaggio"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Invia
              </button>
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Annulla
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Responsive Navigation Demo */}
      <section className="container mb-8">
        <h2 className="text-2xl font-bold mb-4">Navigazione Responsive</h2>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Mobile navigation */}
          {isMobile && (
            <div className="bg-gray-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold">Menu Mobile</span>
                <button className="p-2 rounded-md bg-gray-200">
                  ☰
                </button>
              </div>
              <nav className="space-y-2">
                {['Home', 'Servizi', 'Chi Siamo', 'Contatti'].map(item => (
                  <a
                    key={item}
                    href="#"
                    className="block p-2 rounded-md hover:bg-gray-200"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Desktop navigation */}
          {(isTablet || isDesktop) && (
            <div className="bg-gray-100 p-4">
              <nav className="flex space-x-6 justify-center">
                {['Home', 'Servizi', 'Chi Siamo', 'Contatti', 'Blog', 'FAQ'].map(item => (
                  <a
                    key={item}
                    href="#"
                    className="px-3 py-2 rounded-md hover:bg-gray-200 font-medium"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Performance indicators */}
      <section className="container mb-8">
        <h2 className="text-2xl font-bold mb-4">Indicatori di Performance</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600">{width}px</div>
            <div className="text-sm text-gray-600">Larghezza</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">{optimalColumns}</div>
            <div className="text-sm text-gray-600">Colonne Ottimali</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-purple-600">{fontSize}px</div>
            <div className="text-sm text-gray-600">Font Size</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-orange-600">{Math.round(spacing)}px</div>
            <div className="text-sm text-gray-600">Spacing</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container text-center">
          <h3 className="text-lg font-semibold mb-2">YourBusinessInItaly</h3>
          <p className="text-gray-400 mb-4">
            Demo responsive hooks - Dimensione viewport: {width}x{height}px
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span>Dispositivo: {deviceType}</span>
            <span>•</span>
            <span>Orientamento: {isLandscape ? 'Landscape' : 'Portrait'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResponsiveHooksExample;