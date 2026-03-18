import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function SiteLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative flex min-h-screen flex-col overflow-x-hidden bg-base text-soft">
			<div className="noise-layer" aria-hidden="true" />
			<div className="orb-layer" aria-hidden="true" />
			<Header />
			<main className="relative z-10 flex flex-1">
				<div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-10 md:py-14">
					{children}
				</div>
			</main>
			<Footer />
		</div>
	);
}
