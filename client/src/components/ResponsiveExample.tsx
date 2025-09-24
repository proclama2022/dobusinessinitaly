import React from 'react';

const ResponsiveExample = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Vai al contenuto principale
      </a>

      {/* Navigation Responsive */}
      <nav className="nav-responsive">
        <div className="nav-container">
          <a href="/" className="nav-logo">YourBusinessInItaly</a>
          <button className="nav-toggle" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className="nav-menu">
            <li><a href="/services">Servizi</a></li>
            <li><a href="/contact">Contatti</a></li>
            <li><a href="/about">Chi Siamo</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section Responsive */}
      <section id="main-content" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title-responsive">
            Commercialista per Stranieri in Italia
          </h1>
          <p className="hero-subtitle-responsive">
            La tua guida esperta per fare business in Italia. Consulenza fiscale,
            apertura società e assistenza completa per imprenditori stranieri.
          </p>
          <div className="hero-buttons-responsive">
            <button className="btn btn-primary">
              Richiedi Consultazione
            </button>
            <button className="btn btn-secondary">
              Scopri i Servizi
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-responsive-3xl font-bold mb-4">
              I Nostri Servizi
            </h2>
            <p className="text-responsive max-w-2xl mx-auto">
              Offriamo una gamma completa di servizi per aiutarti a avviare e gestire
              la tua attività in Italia.
            </p>
          </div>

          <div className="services-grid-responsive">
            <div className="service-card-responsive">
              <div className="service-icon-responsive">
                📋
              </div>
              <h3 className="service-title-responsive">
                Apertura Società
              </h3>
              <p className="service-description-responsive">
                Assistenza completa per l'apertura di SRL, SNC e altre forme societarie in Italia.
              </p>
            </div>

            <div className="service-card-responsive">
              <div className="service-icon-responsive">
                💰
              </div>
              <h3 className="service-title-responsive">
                Partita IVA
              </h3>
              <p className="service-description-responsive">
                Apertura partita IVA e consulenza sul regime fiscale più adatto alla tua attività.
              </p>
            </div>

            <div className="service-card-responsive">
              <div className="service-icon-responsive">
                📊
              </div>
              <h3 className="service-title-responsive">
                Consulenza Fiscale
              </h3>
              <p className="service-description-responsive">
                Consulenza specialistica su fiscalità italiana per imprese e professionisti stranieri.
              </p>
            </div>

            <div className="service-card-responsive">
              <div className="service-icon-responsive">
                🏛️
              </div>
              <h3 className="service-title-responsive">
                Regime Forfettario
              </h3>
              <p className="service-description-responsive">
                Analisi e gestione del regime forfettario per massimizzare i vantaggi fiscali.
              </p>
            </div>

            <div className="service-card-responsive">
              <div className="service-icon-responsive">
                📝
              </div>
              <h3 className="service-title-responsive">
                Contabilità
              </h3>
              <p className="service-description-responsive">
                Servizi completi di contabilità, bilanci e adempimenti fiscali periodici.
              </p>
            </div>

            <div className="service-card-responsive">
              <div className="service-icon-responsive">
                🌍
              </div>
              <h3 className="service-title-responsive">
                Internazionalizzazione
              </h3>
              <p className="service-description-responsive">
                Supporto per l'espansione internazionale della tua attività italiana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-responsive-3xl font-bold mb-4">
              Contattaci
            </h2>
            <p className="text-responsive max-w-2xl mx-auto">
              Richiedi una consulenza gratuita senza impegno. Ti risponderemo entro 24 ore.
            </p>
          </div>

          <div className="contact-form-responsive">
            <form className="form-grid-responsive">
              <div className="form-group-responsive">
                <label htmlFor="name" className="form-label-responsive">
                  Nome e Cognome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input-responsive"
                  placeholder="Mario Rossi"
                  required
                />
              </div>

              <div className="form-group-responsive">
                <label htmlFor="email" className="form-label-responsive">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input-responsive"
                  placeholder="mario.rossi@email.com"
                  required
                />
              </div>

              <div className="form-group-responsive">
                <label htmlFor="phone" className="form-label-responsive">
                  Telefono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input-responsive"
                  placeholder="+39 123 456 7890"
                />
              </div>

              <div className="form-group-responsive">
                <label htmlFor="service" className="form-label-responsive">
                  Servizio di Interesse
                </label>
                <select
                  id="service"
                  name="service"
                  className="form-input-responsive"
                  required
                >
                  <option value="">Seleziona un servizio</option>
                  <option value="apertura-societa">Apertura Società</option>
                  <option value="partita-iva">Apertura Partita IVA</option>
                  <option value="consulenza-fiscale">Consulenza Fiscale</option>
                  <option value="regime-forfettario">Regime Forfettario</option>
                  <option value="altro">Altro</option>
                </select>
              </div>

              <div className="form-group-responsive md:col-span-2">
                <label htmlFor="message" className="form-label-responsive">
                  Messaggio
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea-responsive"
                  placeholder="Descrivi brevemente le tue esigenze..."
                  rows={4}
                  required
                ></textarea>
              </div>

              <div className="form-group-responsive md:col-span-2">
                <button type="submit" className="btn btn-primary w-full">
                  Invia Messaggio
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-responsive">
        <div className="cta-content-responsive">
          <h2 className="cta-title-responsive">
            Pronto a Iniziare?
          </h2>
          <p className="cta-description-responsive">
            Contattaci oggi per una consulenza gratuita e scopri come possiamo aiutarti
            a realizzare il tuo progetto imprenditoriale in Italia.
          </p>
          <div className="cta-buttons-responsive">
            <button className="btn btn-white btn-outline">
              Chiamaci Ora
            </button>
            <button className="btn btn-white btn-primary">
              Prenota Incontro
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-responsive-3xl font-bold mb-4">
              Blog e Guide
            </h2>
            <p className="text-responsive max-w-2xl mx-auto">
              Approfondimenti e guide pratiche per fare business in Italia.
            </p>
          </div>

          <div className="blog-grid-responsive">
            <article className="blog-card-responsive">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop"
                alt="Apertura società in Italia"
                className="blog-image-responsive"
              />
              <div className="blog-content-responsive">
                <div className="blog-category-responsive">
                  Guide Pratiche
                </div>
                <h3 className="blog-title-responsive">
                  Come Aprire una Società in Italia: Guida Completa
                </h3>
                <p className="blog-excerpt-responsive">
                  Scopri tutti i passaggi necessari per aprire una società in Italia,
                  dai documenti richiesti alle tempistiche previste.
                </p>
                <div className="blog-meta-responsive">
                  15 Gennaio 2024 • 5 min lettura
                </div>
              </div>
            </article>

            <article className="blog-card-responsive">
              <img
                src="https://images.unsplash.com/photo-1554224155-8727b3ff858f?w=400&h=250&fit=crop"
                alt="Regime forfettario"
                className="blog-image-responsive"
              />
              <div className="blog-content-responsive">
                <div className="blog-category-responsive">
                  Fisco
                </div>
                <h3 className="blog-title-responsive">
                  Regime Forfettario 2024: Novità e Vantaggi
                </h3>
                <p className="blog-excerpt-responsive">
                  Analisi completa del regime forfettario, con i requisiti, i vantaggi
                  fiscali e come aderire nel 2024.
                </p>
                <div className="blog-meta-responsive">
                  10 Gennaio 2024 • 7 min lettura
                </div>
              </div>
            </article>

            <article className="blog-card-responsive">
              <img
                src="https://images.unsplash.com/photo-1554224155-8727b3ff858f?w=400&h=250&fit=crop"
                alt="Partita IVA"
                className="blog-image-responsive"
              />
              <div className="blog-content-responsive">
                <div className="blog-category-responsive">
                  Tutorial
                </div>
                <h3 className="blog-title-responsive">
                  Partita IVA per Stranieri: Requisiti e Procedura
                </h3>
                <p className="blog-excerpt-responsive">
                  Guida dettagliata su come aprire partita IVA in Italia per cittadini
                  stranieri, con documenti necessari e costi.
                </p>
                <div className="blog-meta-responsive">
                  5 Gennaio 2024 • 6 min lettura
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-responsive-3xl font-bold mb-4">
              Cosa Dicono i Nostri Clienti
            </h2>
            <p className="text-responsive max-w-2xl mx-auto">
              Le testimonianze di imprenditori stranieri che hanno scelto i nostri servizi.
            </p>
          </div>

          <div className="testimonials-container-responsive">
            <div className="testimonials-grid-responsive">
              <div className="testimonial-card-responsive">
                <p className="testimonial-quote-responsive">
                  "Professionisti eccezionali! Hanno guidato la nostra azienda attraverso
                  tutto il processo di apertura società in Italia con competenza e pazienza."
                </p>
                <div className="testimonial-author-responsive">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                    alt="Sarah Johnson"
                    className="testimonial-avatar-responsive"
                  />
                  <div className="testimonial-info-responsive">
                    <div className="testimonial-name-responsive">
                      Sarah Johnson
                    </div>
                    <div className="testimonial-role-responsive">
                      CEO, TechStartup Srl
                    </div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card-responsive">
                <p className="testimonial-quote-responsive">
                  "Consulenza fiscale impeccabile. Ci hanno aiutato a ottimizzare
                  la nostra posizione fiscale e a risparmiare migliaia di euro."
                </p>
                <div className="testimonial-author-responsive">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face"
                    alt="Marco Mueller"
                    className="testimonial-avatar-responsive"
                  />
                  <div className="testimonial-info-responsive">
                    <div className="testimonial-name-responsive">
                      Marco Mueller
                    </div>
                    <div className="testimonial-role-responsive">
                      Imprenditore
                    </div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card-responsive">
                <p className="testimonial-quote-responsive">
                  "Servizio multilingue di alta qualità. Hanno reso semplice
                  e comprensibile tutto il processo burocratico italiano."
                </p>
                <div className="testimonial-author-responsive">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face"
                    alt="Emma Chen"
                    className="testimonial-avatar-responsive"
                  />
                  <div className="testimonial-info-responsive">
                    <div className="testimonial-name-responsive">
                      Emma Chen
                    </div>
                    <div className="testimonial-role-responsive">
                      Direttrice, E-commerce Italia
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Responsive */}
      <footer className="footer-responsive">
        <div className="footer-content-responsive">
          <div className="footer-section-responsive">
            <h3 className="footer-title-responsive">
              YourBusinessInItaly
            </h3>
            <p className="text-responsive">
              Il tuo partner esperto per fare business in Italia. Consulenza fiscale,
              apertura società e assistenza completa per imprenditori stranieri.
            </p>
          </div>

          <div className="footer-section-responsive">
            <h3 className="footer-title-responsive">
              Servizi
            </h3>
            <ul className="footer-links-responsive">
              <li><a href="/services/apertura-societa">Apertura Società</a></li>
              <li><a href="/services/partita-iva">Partita IVA</a></li>
              <li><a href="/services/consulenza-fiscale">Consulenza Fiscale</a></li>
              <li><a href="/services/regime-forfettario">Regime Forfettario</a></li>
            </ul>
          </div>

          <div className="footer-section-responsive">
            <h3 className="footer-title-responsive">
              Informazioni
            </h3>
            <ul className="footer-links-responsive">
              <li><a href="/about">Chi Siamo</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contatti</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-section-responsive">
            <h3 className="footer-title-responsive">
              Contatti
            </h3>
            <ul className="footer-links-responsive">
              <li>📞 +39 123 456 7890</li>
              <li>📧 info@yourbusinessinitaly.com</li>
              <li>📍 Via Roma 1, Milano</li>
              <li>🕒 Lun-Ven: 9:00-18:00</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-responsive">
          <p>&copy; 2024 YourBusinessInItaly. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
};

export default ResponsiveExample;