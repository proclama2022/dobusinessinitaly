import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

export function LocaleNavLink({ to, children, className = '', activeClassName = '', onClick, ...rest }: {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  const { i18n } = useTranslation();
  
  // Costruisce un percorso con il prefisso della lingua corrente
  const localizedTo = to === '/' 
    ? `/${i18n.language}` 
    : `/${i18n.language}${to}`;
    
  return (
    <Link 
      href={localizedTo}
      onClick={onClick}
      {...rest}
      className={className}
    >
      {children}
    </Link>
  );
}