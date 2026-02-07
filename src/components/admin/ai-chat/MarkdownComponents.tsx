import type { Components } from 'react-markdown';

export const markdownComponents: Components = {
  table: ({ children }) => (
    <div className="overflow-x-auto my-3 rounded-lg border border-border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted/50 border-b border-border">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 text-left font-semibold text-foreground text-xs uppercase tracking-wider">{children}</th>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="even:bg-muted/30 transition-colors">{children}</tr>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 text-muted-foreground">{children}</td>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes('language-') || (typeof children === 'string' && children.includes('\n'));
    if (isBlock) {
      return (
        <pre className="bg-[#0d1117] text-[#e6edf3] rounded-lg p-4 overflow-x-auto my-3 text-xs font-mono border border-border/50">
          <code>{children}</code>
        </pre>
      );
    }
    return (
      <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-accent-foreground" {...props}>
        {children}
      </code>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-muted-foreground">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 space-y-1 my-2 marker:text-accent-emerald">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 space-y-1 my-2 marker:text-accent-emerald">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-muted-foreground leading-relaxed">{children}</li>
  ),
  h1: ({ children }) => (
    <h1 className="text-lg font-bold text-foreground mt-4 mb-2">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-base font-bold text-foreground mt-3 mb-1.5 pb-1 border-b border-border/50">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-bold text-foreground mt-3 mb-1 pb-1 border-b border-border/30">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-muted-foreground leading-relaxed my-1.5 text-sm">{children}</p>
  ),
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent-emerald pl-3 my-2 text-muted-foreground italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-border my-3" />,
};
