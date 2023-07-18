import ReactMarkdown from "react-markdown";
import {CodeBlock} from "@/app/components/CodeBlock";

export const StreamMarkdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown components={{ code: CodeBlock }}>
      {content}
    </ReactMarkdown>
  );
};