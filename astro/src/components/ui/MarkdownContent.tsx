import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownContent({ markdown }: { markdown: string }) {
	return (
		<div className="markdown-body">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					a: ({ ...props }) => (
						<a {...props} target="_blank" rel="noreferrer" />
					),
				}}
			>
				{markdown}
			</ReactMarkdown>
		</div>
	);
}
