import Lenis from "lenis";
import { useCallback, useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import "./ScrollStack.css";

export interface ScrollStackItemProps {
	itemClassName?: string;
	children: ReactNode;
}

export function ScrollStackItem({
	children,
	itemClassName = "",
}: ScrollStackItemProps) {
	return (
		<div className={`scroll-stack-card ${itemClassName}`.trim()}>
			{children}
		</div>
	);
}

interface ScrollStackProps {
	className?: string;
	children: ReactNode;
	itemDistance?: number;
	itemScale?: number;
	itemStackDistance?: number;
	stackPosition?: string;
	scaleEndPosition?: string;
	baseScale?: number;
	rotationAmount?: number;
	blurAmount?: number;
	useWindowScroll?: boolean;
	onStackComplete?: () => void;
}

function parsePercentage(value: string | number, containerHeight: number) {
	if (typeof value === "string" && value.includes("%")) {
		return (Number.parseFloat(value) / 100) * containerHeight;
	}
	return Number.parseFloat(String(value));
}

function calculateProgress(scrollTop: number, start: number, end: number) {
	if (scrollTop < start) {
		return 0;
	}
	if (scrollTop > end) {
		return 1;
	}
	return (scrollTop - start) / (end - start);
}

function getDocumentOffsetTop(element: HTMLElement) {
	let offset = 0;
	let current: HTMLElement | null = element;

	while (current) {
		offset += current.offsetTop;
		current = current.offsetParent as HTMLElement | null;
	}

	return offset;
}

export default function ScrollStack({
	children,
	className = "",
	itemDistance = 100,
	itemScale = 0.03,
	itemStackDistance = 30,
	stackPosition = "20%",
	scaleEndPosition = "10%",
	baseScale = 0.85,
	rotationAmount = 0,
	blurAmount = 0,
	useWindowScroll = false,
	onStackComplete,
}: ScrollStackProps) {
	const scrollerRef = useRef<HTMLDivElement>(null);
	const stackCompletedRef = useRef(false);
	const animationFrameRef = useRef<number | null>(null);
	const lenisRef = useRef<Lenis | null>(null);
	const cardsRef = useRef<HTMLElement[]>([]);
	const lastTransformsRef = useRef(
		new Map<
			number,
			{ translateY: number; scale: number; rotation: number; blur: number }
		>(),
	);
	const isUpdatingRef = useRef(false);

	const getScrollData = useCallback(() => {
		if (useWindowScroll) {
			const scroller = scrollerRef.current;
			return {
				scrollTop: window.scrollY,
				containerHeight: scroller?.clientHeight ?? window.innerHeight,
			};
		}

		const scroller = scrollerRef.current;
		if (!scroller) {
			return { scrollTop: 0, containerHeight: 1 };
		}

		return {
			scrollTop: scroller.scrollTop,
			containerHeight: scroller.clientHeight,
		};
	}, [useWindowScroll]);

	const getElementOffset = useCallback(
		(element: HTMLElement) => {
			if (useWindowScroll) {
				return getDocumentOffsetTop(element);
			}
			return element.offsetTop;
		},
		[useWindowScroll],
	);

	const updateCardTransforms = useCallback(() => {
		if (!cardsRef.current.length || isUpdatingRef.current) {
			return;
		}

		isUpdatingRef.current = true;

		const { scrollTop, containerHeight } = getScrollData();
		const stackPositionPx = parsePercentage(stackPosition, containerHeight);
		const scaleEndPositionPx = parsePercentage(
			scaleEndPosition,
			containerHeight,
		);

		const endElement = scrollerRef.current?.querySelector(
			".scroll-stack-end",
		) as HTMLElement | null;

		const endElementTop = endElement ? getElementOffset(endElement) : 0;

		cardsRef.current.forEach((card, i) => {
			const cardTop = getElementOffset(card);
			const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
			const triggerEnd = cardTop - scaleEndPositionPx;
			const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
			const pinEnd = endElementTop - containerHeight / 2;

			const scaleProgress = calculateProgress(
				scrollTop,
				triggerStart,
				triggerEnd,
			);
			const targetScale = baseScale + i * itemScale;
			const scale = 1 - scaleProgress * (1 - targetScale);
			const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

			let blur = 0;
			if (blurAmount) {
				let topCardIndex = 0;
				for (let j = 0; j < cardsRef.current.length; j += 1) {
					const jCardTop = getElementOffset(cardsRef.current[j]);
					const jTriggerStart =
						jCardTop - stackPositionPx - itemStackDistance * j;
					if (scrollTop >= jTriggerStart) {
						topCardIndex = j;
					}
				}

				if (i < topCardIndex) {
					const depthInStack = topCardIndex - i;
					blur = Math.max(0, depthInStack * blurAmount);
				}
			}

			let translateY = 0;
			const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

			if (isPinned) {
				translateY =
					scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
			} else if (scrollTop > pinEnd) {
				translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
			}

			const nextTransform = {
				translateY: Math.round(translateY * 100) / 100,
				scale: Math.round(scale * 1000) / 1000,
				rotation: Math.round(rotation * 100) / 100,
				blur: Math.round(blur * 100) / 100,
			};

			const last = lastTransformsRef.current.get(i);
			const hasChanged =
				!last ||
				Math.abs(last.translateY - nextTransform.translateY) > 0.1 ||
				Math.abs(last.scale - nextTransform.scale) > 0.001 ||
				Math.abs(last.rotation - nextTransform.rotation) > 0.1 ||
				Math.abs(last.blur - nextTransform.blur) > 0.1;

			if (hasChanged) {
				card.style.transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
				card.style.filter =
					nextTransform.blur > 0 ? `blur(${nextTransform.blur}px)` : "";
				lastTransformsRef.current.set(i, nextTransform);
			}

			if (i === cardsRef.current.length - 1) {
				const visible = scrollTop >= pinStart && scrollTop <= pinEnd;
				if (visible && !stackCompletedRef.current) {
					stackCompletedRef.current = true;
					onStackComplete?.();
				} else if (!visible && stackCompletedRef.current) {
					stackCompletedRef.current = false;
				}
			}
		});

		isUpdatingRef.current = false;
	}, [
		baseScale,
		blurAmount,
		getElementOffset,
		getScrollData,
		itemScale,
		itemStackDistance,
		onStackComplete,
		rotationAmount,
		scaleEndPosition,
		stackPosition,
	]);

	const handleScroll = useCallback(() => {
		updateCardTransforms();
	}, [updateCardTransforms]);

	const setupLenis = useCallback(() => {
		if (useWindowScroll) {
			const lenis = new Lenis({
				duration: 1.2,
				easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
				smoothWheel: true,
				touchMultiplier: 2,
				infinite: false,
				wheelMultiplier: 1,
				lerp: 0.1,
				syncTouch: true,
				syncTouchLerp: 0.075,
			});

			lenis.on("scroll", handleScroll);
			const raf = (time: number) => {
				lenis.raf(time);
				animationFrameRef.current = requestAnimationFrame(raf);
			};
			animationFrameRef.current = requestAnimationFrame(raf);
			lenisRef.current = lenis;
			return;
		}

		const scroller = scrollerRef.current;
		if (!scroller) {
			return;
		}

		const lenis = new Lenis({
			wrapper: scroller,
			content: scroller.querySelector(".scroll-stack-inner") as HTMLElement,
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
			smoothWheel: true,
			touchMultiplier: 2,
			infinite: false,
			gestureOrientation: "vertical",
			wheelMultiplier: 1,
			lerp: 0.1,
			syncTouch: true,
			syncTouchLerp: 0.075,
		});

		lenis.on("scroll", handleScroll);
		const raf = (time: number) => {
			lenis.raf(time);
			animationFrameRef.current = requestAnimationFrame(raf);
		};
		animationFrameRef.current = requestAnimationFrame(raf);
		lenisRef.current = lenis;
	}, [handleScroll, useWindowScroll]);

	useLayoutEffect(() => {
		const scroller = scrollerRef.current;
		if (!scroller) {
			return;
		}

		const cards = Array.from(
			scroller.querySelectorAll(".scroll-stack-card"),
		) as HTMLElement[];

		cardsRef.current = cards;

		cards.forEach((card, i) => {
			if (i < cards.length - 1) {
				card.style.marginBottom = `${itemDistance}px`;
			}
			card.style.willChange = "transform, filter";
			card.style.transformOrigin = "top center";
			card.style.backfaceVisibility = "hidden";
			card.style.transform = "translateZ(0)";
			card.style.webkitTransform = "translateZ(0)";
			card.style.perspective = "1000px";
			card.style.webkitPerspective = "1000px";
		});

		setupLenis();
		updateCardTransforms();

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			lenisRef.current?.destroy();
			stackCompletedRef.current = false;
			cardsRef.current = [];
			lastTransformsRef.current.clear();
			isUpdatingRef.current = false;
		};
	}, [itemDistance, setupLenis, updateCardTransforms]);

	return (
		<div
			className={[
				"scroll-stack-scroller",
				useWindowScroll ? "scroll-stack-scroller--window" : "",
				className,
			]
				.filter(Boolean)
				.join(" ")}
			ref={scrollerRef}
		>
			<div className="scroll-stack-inner">
				{children}
				<div className="scroll-stack-end" />
			</div>
		</div>
	);
}
