import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
	const [open, setOpen] = useState(false);
	const primaryNav = [
		{ label: "Work", href: "/projects" },
		{ label: "Writing", href: "/blog" },
		{ label: "About", href: "/about" },
	];

	return (
		<header className="sticky top-0 z-50 border-b border-line/60 bg-base/75 backdrop-blur-xl">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
				<Link
					to="/"
					className="inline-flex items-center gap-2 rounded-full border border-line/80 bg-surface/70 px-3 py-1.5 text-sm font-semibold tracking-[0.08em] text-soft transition hover:border-accent/70"
				>
					<img src="/assets/images/logo.png" alt="Rakai" className="h-6 w-6" />
					<span>Rakai</span>
				</Link>

				<nav className="hidden items-center gap-2 rounded-full border border-line/70 bg-surface/60 p-1 md:flex">
					{primaryNav.map((item) => (
						<AnchorItem key={item.href} href={item.href} label={item.label} />
					))}
				</nav>

				<button
					type="button"
					onClick={() => setOpen((value) => !value)}
					className="inline-flex rounded-full border border-line/80 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-soft md:hidden"
				>
					Menu
				</button>

				<div className="hidden items-center gap-2 md:flex">
					<a
						href="/CV_RAKAI.pdf"
						target="_blank"
						rel="noreferrer"
						className="rounded-full border border-line/80 px-3 py-1.5 text-xs font-medium tracking-[0.08em] text-muted transition hover:border-accent/60 hover:text-soft"
					>
						CV
					</a>
					<a
						href="https://www.linkedin.com/in/rakaiseto"
						target="_blank"
						rel="noreferrer"
						className="rounded-full border border-accent/80 bg-accent/15 px-4 py-1.5 text-xs font-medium tracking-[0.08em] text-accent transition hover:shadow-glow"
					>
						Hire Me
					</a>
				</div>
			</div>

			{open ? (
				<nav className="mx-5 mb-5 grid gap-2 rounded-2xl border border-line/70 bg-surface/95 p-3 shadow-panel md:hidden">
					{primaryNav.map((item) => (
						<AnchorItem
							key={item.href}
							href={item.href}
							label={item.label}
							onClick={() => setOpen(false)}
						/>
					))}
					<NavItem href="/blog" label="Blog" onClick={() => setOpen(false)} />
					<NavItem
						href="/projects"
						label="Projects"
						onClick={() => setOpen(false)}
					/>
					<div className="mt-1 grid grid-cols-2 gap-2">
						<a
							href="/CV_RAKAI.pdf"
							target="_blank"
							rel="noreferrer"
							className="rounded-full border border-line/80 px-3 py-2 text-center font-mono text-xs text-muted"
						>
							CV
						</a>
						<a
							href="https://www.linkedin.com/in/rakaiseto"
							target="_blank"
							rel="noreferrer"
							className="rounded-full border border-accent/80 bg-accent/15 px-3 py-2 text-center font-mono text-xs text-accent"
						>
							Hire Me
						</a>
					</div>
				</nav>
			) : null}
		</header>
	);
}

function AnchorItem({
	href,
	label,
	onClick,
}: {
	href: string;
	label: string;
	onClick?: () => void;
}) {
	return (
		<NavLink
			to={href}
			onClick={onClick}
			className={({ isActive }) =>
				[
					"rounded-full px-3 py-2 text-xs font-medium tracking-[0.1em] transition",
					isActive ? "text-soft" : "text-muted hover:text-soft",
				].join(" ")
			}
		>
			{label}
		</NavLink>
	);
}

function NavItem({
	href,
	label,
	onClick,
}: {
	href: string;
	label: string;
	onClick?: () => void;
}) {
	return (
		<NavLink
			to={href}
			onClick={onClick}
			className={({ isActive }) =>
				[
					"rounded-full border px-3 py-2 text-xs font-medium tracking-[0.1em] transition duration-200",
					isActive
						? "border-accent/70 bg-accent/10 text-accent"
						: "border-line/80 text-muted hover:border-accent/60 hover:text-soft",
				].join(" ")
			}
		>
			{label}
		</NavLink>
	);
}
