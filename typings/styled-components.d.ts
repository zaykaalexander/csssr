import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		base: {
			white: string,
			dark: string,
			blue: string,
			background: string,
		},
		form: {
			gradient: {
				color1: string,
				color2: string,
			},
		},
		issue: {
			number: string,
			title: string,
			date: string,
			border: string,
		},
		alerts: {
			success: string,
			warning: string,
			danger: string,
		}
	}
}
