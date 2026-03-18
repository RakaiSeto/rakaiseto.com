const socials = [
	{ name: "Instagram", href: "https://instagram.com/rakss101" },
	{ name: "Github", href: "https://github.com/rakaiseto" },
	{ name: "LinkedIn", href: "https://www.linkedin.com/in/rakaiseto" },
];

export default function Footer() {
	return (
		<footer className="border-t border-line/60">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between">
				<div>
					<p className="mt-2 text-2xl font-semibold tracking-tight text-soft">
						Rakai Seto
					</p>
					<p className="mt-2 text-sm text-soft/80">
						&copy; {new Date().getFullYear()} All rights reserved.
					</p>
				</div>
				<div className="flex flex-wrap gap-2">
					{socials.map((social) => (
						<a
							key={social.name}
							href={social.href}
							target="_blank"
							rel="noreferrer"
							className="rounded-full border border-line/80 px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-soft/80 transition hover:border-accent/70 hover:text-accent"
						>
							{social.name}
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
