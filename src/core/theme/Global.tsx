import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700,800&display=swap');

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	body {
		font-family: 'Nanum Gothic', sans-serif;
		font-size: 100%;
	}
	
	button, input, textarea, select {
		font-family: 'Nanum Gothic', sans-serif;
		font-size: 100%;
		
		outline: none;
	}

	#app {
		display: flex;
	
		width: 100vw;
		height: 100vh;
	}
`;
