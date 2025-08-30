import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const GoogleMap = () => {
  const { t } = useTranslation();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleError = () => {
      console.error('Google Maps failed to load');
      if (iframe) iframe.style.display = 'none';
    };

    iframe.addEventListener('error', handleError);
    
    // Cleanup function
    return () => {
      iframe.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="aspect-video w-full">
      <iframe
        ref={iframeRef}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.7795502588883!2d15.101126376590404!3d37.51223167205279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313fcb5e93d5389%3A0x61faf25f2c48b9d8!2sViale%20Africa%2C%2031%2C%2095129%20Catania%20CT!5e1!3m2!1sit!2sit!4v1746641991088!5m2!1sit!2sit"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={t('contact.map.titleAlt')}
      />
    </div>
  );
};

export default GoogleMap;
