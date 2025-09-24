# YourBusinessInItaly - Sistema Responsive Mobile-First

Questo documento descrive il sistema responsive implementato per YourBusinessInItaly, con un approccio mobile-first e breakpoint ottimizzati per tutti i dispositivi.

## 📱 Breakpoint Definiti

Il sistema utilizza i seguenti breakpoint compatibili con Tailwind CSS:

| Breakpoint | Dimensioni | Dispositivi | Prefisso Media Query |
|------------|------------|-------------|----------------------|
| **Mobile** | < 768px | Smartphone | `(max-width: 767px)` |
| **Tablet** | 768px - 1023px | Tablet | `(min-width: 768px)` |
| **Desktop** | ≥ 1024px | Desktop | `(min-width: 1024px)` |

### Breakpoint Aggiuntivi (opzionali)

| Breakpoint | Dimensioni | Dispositivi | Prefisso Media Query |
|------------|------------|-------------|----------------------|
| **XS** | 475px | Small phones | `(min-width: 475px)` |
| **SM** | 640px | Small tablets | `(min-width: 640px)` |
| **LG** | 1024px | Small desktops | `(min-width: 1024px)` |
| **XL** | 1280px | Desktops | `(min-width: 1280px)` |
| **2XL** | 1320px | Large desktops | `(min-width: 1320px)` |

## 🎯 File CSS Disponibili

### 1. `/client/src/styles/responsive.css`
File principale con tutte le classi responsive base.

### 2. `/client/src/styles/responsive-examples.css`
Esempi pratici di utilizzo per componenti comuni.

### 3. `/client/src/styles/performance.css`
Ottimizzazioni per performance e Core Web Vitals.

## 🚀 Utilizzo nei Componenti

### Container Responsive

```jsx
<div className="container">
  {/* Contenuto responsive */}
</div>
```

### Tipografia Responsive

```jsx
<h1 className="text-responsive-4xl">Titolo Principale</h1>
<h2 className="text-responsive-3xl">Sottotitolo</h2>
<p className="text-responsive">Testo di contenuto</p>
```

### Layout Responsive

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <div className="card">Card 1</div>
  <div className="card">Card 2</div>
  <div className="card">Card 3</div>
</div>
```

### Pulsanti Responsive

```jsx
<button className="btn btn-primary">Pulsante Primario</button>
<button className="btn btn-secondary">Pulsante Secondario</button>
<button className="btn btn-outline">Pulsante Outline</button>
```

### Spaziatura Responsive

```jsx
<div className="section-padding">
  {/* Contenuto con padding responsive */}
</div>

<div className="mb-4 md:mb-8 lg:mb-12">
  {/* Margin bottom responsive */}
</div>
```

## 📐 Componenti Responsive Pre-implementati

### 1. Hero Section

```jsx
<section className="hero-section">
  <div className="hero-content">
    <h1 className="hero-title">Titolo Hero</h1>
    <p className="hero-subtitle">Sottotitolo Hero</p>
    <div className="hero-buttons">
      <button className="btn btn-primary">Azione 1</button>
      <button className="btn btn-secondary">Azione 2</button>
    </div>
  </div>
</section>
```

### 2. Griglia Servizi

```jsx
<div className="services-grid-responsive">
  <div className="service-card-responsive">
    <div className="service-icon-responsive">📋</div>
    <h3 className="service-title-responsive">Servizio 1</h3>
    <p className="service-description-responsive">Descrizione servizio</p>
  </div>
  {/* Altri servizi... */}
</div>
```

### 3. Form Contatti

```jsx
<form className="contact-form-responsive">
  <div className="form-group-responsive">
    <label className="form-label-responsive">Nome</label>
    <input type="text" className="form-input-responsive" />
  </div>
  <div className="form-group-responsive">
    <label className="form-label-responsive">Email</label>
    <input type="email" className="form-input-responsive" />
  </div>
  <div className="form-group-responsive">
    <label className="form-label-responsive">Messaggio</label>
    <textarea className="form-textarea-responsive"></textarea>
  </div>
  <button type="submit" className="btn btn-primary">Invia</button>
</form>
```

### 4. Navigazione Responsive

```jsx
<nav className="nav-responsive">
  <div className="nav-container">
    <a href="/" className="nav-logo">YourBusinessInItaly</a>
    <button className="nav-toggle">☰</button>
    <ul className="nav-menu">
      <li><a href="/services">Servizi</a></li>
      <li><a href="/contact">Contatti</a></li>
      <li><a href="/about">Chi Siamo</a></li>
    </ul>
  </div>
</nav>
```

## 🎨 Classi Utility Disponibili

### Tipografia
- `.text-responsive-xs` - `.text-responsive-5xl`
- `.font-light` - `.font-bold`
- `.text-center`, `.text-left`, `.text-right`

### Layout
- `.container`, `.container-sm` - `.container-2xl`
- `.grid`, `.grid-cols-1` - `.grid-cols-4`
- `.flex`, `.flex-col`, `.flex-wrap`

### Spaziatura
- `.py-2` - `.py-24` (padding verticale)
- `.px-2` - `.px-20` (padding orizzontale)
- `.mb-2` - `.mb-16` (margin bottom)
- `.mt-2` - `.mt-16` (margin top)

### Componenti
- `.card`, `.card-header`, `.card-title`, `.card-content`
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`
- `.form-group`, `.form-label`, `.form-input`, `.form-textarea`

### Utilità
- `.rounded`, `.rounded-lg`, `.rounded-full`
- `.shadow`, `.shadow-md`, `.shadow-lg`
- `.text-white`, `.text-primary`, `.text-secondary`
- `.bg-white`, `.bg-primary`, `.bg-gray-50`, `.bg-gray-100`

## ♿ Accessibilità

### Focus Indicators
Tutti gli elementi interattivi hanno indicatori di focus chiari:

```css
:focus {
  outline: 2px solid #2d5016;
  outline-offset: 2px;
}
```

### Touch Targets
Dimensioni minime per touch su mobile:

```css
button, .btn, a, input, select, textarea {
  min-height: 44px;
  min-width: 44px;
}
```

### Skip to Content
Link per saltare al contenuto principale:

```jsx
<a href="#main-content" className="skip-to-content">
  Vai al contenuto principale
</a>
```

## 🚀 Performance Ottimizzazioni

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  .btn {
    border: 2px solid currentColor;
  }
  .card {
    border: 1px solid #374151;
  }
}
```

### Mobile Optimizations
- Ottimizzazione per iOS Safari con `@supports (-webkit-touch-callout: none)`
- Fix per hover state su dispositivi touch
- Layout stabile con `aspect-ratio` per immagini

## 🔧 Integrazione con Tailwind CSS

Il sistema è completamente compatibile con Tailwind CSS. Puoi utilizzare:

1. **Classi Tailwind standard**: `md:flex`, `lg:grid-cols-3`, ecc.
2. **Classi custom definite**: `.btn-primary`, `.hero-section`, ecc.
3. **Mixin personalizzati**: Per stili complessi

### Esempio di utilizzo misto:

```jsx
<div className="container mx-auto px-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="card hover-lift">
      <h3 className="card-title">Titolo Card</h3>
      <p className="card-content">Contenuto card</p>
      <button className="btn btn-primary w-full">Leggi di più</button>
    </div>
  </div>
</div>
```

## 📱 Test su Dispositivi

### Mobile ( < 768px )
- Single column layouts
- Touch-friendly buttons (44px min)
- Simplified navigation
- Optimized font sizes

### Tablet ( 768px - 1023px )
- Two column grids
- Desktop navigation
- Enhanced spacing
- Larger touch targets

### Desktop ( ≥ 1024px )
- Multi-column layouts
- Full navigation
- Enhanced interactions
- Larger content areas

## 🎯 Best Practice

1. **Mobile-First**: Scrivi stili per mobile, poi aggiungi media queries per schermi più grandi
2. **Performance**: Usa media queries efficienti e minifica il CSS
3. **Accessibilità**: Assicurati che tutti gli elementi siano accessibili da tastiera
4. **Testing**: Testa su diversi dispositivi e dimensioni dello schermo
5. **Mantenibilità**: Usa classi riutilizzabili e naming convention coerenti

## 🚀 Implementazione

Il file responsive è già importato in `/client/src/index.css`. Puoi iniziare a usare le classi responsive immediatamente nei tuoi componenti.

Per aggiungere nuove classi responsive:
1. Aggiungi le classi base in `responsive.css`
2. Aggiungi le media queries appropriate
3. Testa su tutti i dispositivi
4. Aggiorna la documentazione

---

## 📚 Risorse Utili

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev Responsive Design](https://web.dev/learn/design/responsive-design/)
- [CSS Tricks Guide to Responsive Design](https://css-tricks.com/snippets/css/complete-guide-grid/)