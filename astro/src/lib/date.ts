export function cleanHumanDate(value: string): string {
	return value.replace(/(\d+)(st|nd|rd|th)/gi, "$1");
}

export function dateToTime(value: string): number {
	const timestamp = Date.parse(cleanHumanDate(value));
	return Number.isNaN(timestamp) ? 0 : timestamp;
}
