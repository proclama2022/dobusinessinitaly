import { Route, useRoute } from 'wouter';
import { supportedLanguages } from '@/hooks/use-language-prefix';

/**
 * Componente Route localizzato che supporta i prefissi linguistici negli URL
 */
export function LocalizedRoute(props: {
  path: string;
  component: React.ComponentType<any>;
}) {
  // Genera percorsi localizzati per tutte le lingue supportate
  return (
    <>
      {/* Rotta base senza prefisso (redirezionerà automaticamente tramite useLanguagePrefix) */}
      <Route path={props.path} component={props.component} />
      
      {/* Rotte con prefissi linguistici */}
      {supportedLanguages.map(lang => (
        <Route 
          key={lang}
          path={`/${lang}${props.path === '/' ? '' : props.path}`} 
          component={props.component} 
        />
      ))}
    </>
  );
}