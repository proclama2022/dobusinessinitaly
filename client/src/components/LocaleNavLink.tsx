import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { buildLocalizedPath } from '@/lib/languagePaths';

export function LocaleNavLink({ to, children, className = '', activeClassName = '', onClick, ...rest }: {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  const { i18n } = useTranslation();
  
  const localizedTo = buildLocalizedPath(to, i18n.language);
    
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
