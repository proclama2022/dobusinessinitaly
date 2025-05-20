declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

// Tipi per icone e favicon
type IconType = {
  name: string;
  prefix: 'fas' | 'far' | 'fab';
  color?: string;
};

// Estensione del tipo MediaItemProps per supportare icone avanzate
interface ExtendedMediaItemProps {
  faviconSrc?: string;
  articleIcon?: IconType;
  iconColor?: string;
}
