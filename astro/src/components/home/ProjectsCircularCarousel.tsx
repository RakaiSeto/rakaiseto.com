import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type ProjectItem = {
	name: string;
	description: string;
	image: string;
	url: string;
};

const orbitOffsets = [-2, -1, 0, 1, 2];

function wrapIndex(index: number, length: number) {
	if (length === 0) {
		return 0;
	}
	return ((index % length) + length) % length;
}

export default function ProjectsCircularCarousel({
	projects,
}: {
	projects: ProjectItem[];
}) {
	const [active, setActive] = useState(0);
	const [dragStart, setDragStart] = useState<number | null>(null);

	const visibleItems = useMemo(
		() =>
			orbitOffsets.map((offset) => {
				const index = wrapIndex(active + offset, projects.length);
				return { project: projects[index], offset, index };
			}),
		[active, projects],
	);

	const onNext = () => setActive((current) => wrapIndex(current + 1, projects.length));
	const onPrev = () => setActive((current) => wrapIndex(current - 1, projects.length));

	return (
		<section
			className="rounded-3xl border border-line/70 bg-surface/70 p-5 shadow-panel md:p-7"
			onKeyDown={(event) => {
				if (event.key === "ArrowRight") {
					onNext();
				}
				if (event.key === "ArrowLeft") {
					onPrev();
				}
			}}
			tabIndex={0}
		>
			<div className="mb-5 flex items-center justify-between">
				<p className="font-mono text-xs tracking-[0.15em] text-accent">CIRCULAR CAROUSEL</p>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={onPrev}
						className="rounded-full border border-line/70 px-3 py-1 text-xs text-muted transition hover:border-accent/70 hover:text-accent"
					>
						Prev
					</button>
					<button
						type="button"
						onClick={onNext}
						className="rounded-full border border-line/70 px-3 py-1 text-xs text-muted transition hover:border-accent/70 hover:text-accent"
					>
						Next
					</button>
				</div>
			</div>

			<div
				className="projects-orbit relative h-[22rem] overflow-hidden rounded-2xl border border-line/55 bg-base/35 md:h-[24rem]"
				onPointerDown={(event) => setDragStart(event.clientX)}
				onPointerUp={(event) => {
					if (dragStart === null) {
						return;
					}
					const delta = event.clientX - dragStart;
					if (delta > 45) {
						onPrev();
					}
					if (delta < -45) {
						onNext();
					}
					setDragStart(null);
				}}
				onPointerCancel={() => setDragStart(null)}
			>
				{visibleItems.map(({ project, offset, index }) => {
					if (!project) {
						return null;
					}

					const angle = offset * 16;
					const radiusX = 36;
					const translateX = Math.sin((angle * Math.PI) / 180) * radiusX;
					const translateY = Math.abs(offset) * 14;
					const scale = offset === 0 ? 1 : 0.86 - Math.abs(offset) * 0.08;
					const opacity = offset === 0 ? 1 : 0.58 - Math.abs(offset) * 0.12;
					const zIndex = 20 - Math.abs(offset);

					return (
						<Link
							key={`${project.url}-${offset}`}
							to={project.url}
							onMouseEnter={() => setActive(index)}
							className="absolute left-1/2 top-1/2 w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line/60 bg-surface/90 p-3 shadow-card transition duration-300 md:w-[20rem]"
							style={{
								transform: `translate(-50%, -50%) translate(${translateX}%, ${translateY}px) scale(${scale})`,
								opacity,
								zIndex,
							}}
						>
							<img
								src={project.image}
								alt={project.name}
								className="aspect-video w-full rounded-xl border border-line/50 object-cover"
							/>
							<p className="clamp-2 mt-3 text-sm font-semibold leading-tight text-soft md:text-base">
								{project.name}
							</p>
							<p className="clamp-2 mt-1 text-xs leading-relaxed text-muted md:text-sm">
								{project.description}
							</p>
						</Link>
					);
				})}
			</div>

			<div className="mt-5 flex flex-wrap justify-center gap-2">
				{projects.map((project, index) => (
					<button
						type="button"
						key={project.url}
						onClick={() => setActive(index)}
						className={[
							"h-2.5 rounded-full transition-all",
							index === active ? "w-8 bg-accent" : "w-2.5 bg-line/45 hover:bg-line/70",
						].join(" ")}
						aria-label={`Select ${project.name}`}
					/>
				))}
			</div>
		</section>
	);
}
