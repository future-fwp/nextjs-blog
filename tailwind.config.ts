import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		darkMode: "class",
		extend: {
			colors: {
				primary: "#000000",
				secondary: "#06b6d4",
				text: "#FFFFFF",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
} satisfies Config;
