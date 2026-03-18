/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				base: "#070b12",
				surface: "#0f1623",
				line: "#2a3344",
				muted: "#c1ccdf",
				soft: "#dce5f7",
				accent: "#0085c7",
			},
			fontFamily: {
				sans: ["Space Grotesk", "sans-serif"],
				mono: ["IBM Plex Mono", "monospace"],
			},
			boxShadow: {
				panel: "0 20px 45px rgba(2, 8, 20, 0.45)",
				card: "0 10px 30px rgba(0, 0, 0, 0.28)",
				glow: "0 0 0 1px rgba(0, 133, 199, 0.45), 0 8px 22px rgba(0, 133, 199, 0.24)",
			},
		},
	},
	plugins: [],
};
