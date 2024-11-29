/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				informer: {
					"0%": { visibility: "visible" },
					"100%": { visibility: "hidden" },
				},
			},
			animation: {
				// Keep the animation state after completion of the animation.
				informer: "informer 3s ease-in-out forwards",
			},
		},
	},
	plugins: [],
};
