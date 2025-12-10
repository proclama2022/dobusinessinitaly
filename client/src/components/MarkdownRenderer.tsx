import { lazy, Suspense } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

// Lazy load ReactMarkdown per ridurre il bundle iniziale
// I plugin sono piccoli e possono essere importati normalmente
const ReactMarkdown = lazy(() => import('react-markdown'));

interface MarkdownRendererProps {
  content: string;
}

// Componente wrapper per il rendering markdown con lazy loading
const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <Suspense
      fallback={
        <div className="prose lg:prose-lg prose-neutral max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      }
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      >
        {content}
      </ReactMarkdown>
    </Suspense>
  );
};

export default MarkdownRenderer;

