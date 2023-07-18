import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';

export const CodeBlock: CodeComponent = ({ node, inline, className, children }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match && match[1] ? match[1] : '';

  return !inline ? (
    <SyntaxHighlighter
      language={language}
      style={tomorrow}
      wrapLongLines={true}
      showLineNumbers={true}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className}>
      {children}
    </code>
  );
};