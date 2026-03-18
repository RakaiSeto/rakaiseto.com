export default function PageHeading({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className="mb-10">
			<p className="font-mono text-xs tracking-[0.2em] text-accent/90">
				SECTION
			</p>
			<h1 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-tight text-soft md:text-6xl">
				{title}
			</h1>
			<p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-lg">
				{description}
			</p>
		</div>
	);
}
