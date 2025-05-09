import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Componente per visualizzare i breadcrumbs con schema.org markup
 */
const Breadcrumbs = ({ items, className = '' }: BreadcrumbsProps) => {
  const { t } = useTranslation();

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol 
        className="flex flex-wrap items-center space-x-2" 
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {/* Home */}
        <li 
          className="inline-flex items-center"
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem"
        >
          <Link 
            href="/" 
            className="text-neutral-500 hover:text-[#009246] transition-colors"
            itemProp="item"
          >
            <span itemProp="name">{t('navigation.home')}</span>
          </Link>
          <meta itemProp="position" content="1" />
          <span className="mx-2 text-neutral-400">/</span>
        </li>

        {/* Elementi intermedi e finale */}
        {items.map((item, index) => (
          <li 
            key={index}
            className="inline-flex items-center"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            {item.isLast ? (
              <span 
                className="font-medium text-neutral-800"
                itemProp="name"
              >
                {item.label}
              </span>
            ) : (
              <>
                <Link 
                  href={item.path} 
                  className="text-neutral-500 hover:text-[#009246] transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
                <span className="mx-2 text-neutral-400">/</span>
              </>
            )}
            <meta itemProp="position" content={`${index + 2}`} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
