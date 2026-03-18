import type { ReactNode } from "react";

export default function BrutalCard({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={[
				"group relative rounded-2xl border border-line/70 bg-surface/75 p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:bg-surface/95",
				className,
			].join(" ")}
		>
			{children}
		</div>
	);
}
