
import "../index.css";
import "@fontsource/archivo";
import "@fontsource/archivo/600.css";
import "@fontsource/dm-sans";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";

import UserContextProvider from "../contexts/user/userContext.jsx";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

export default function CustomApp({ Component, pageProps }) {
	return (
		<UserContextProvider>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
				/>
			</Head>
			<Script
				src="https://kit.fontawesome.com/64d58efce2.js"
				crossOrigin="anonymous"
			/>
			<Component {...pageProps} />
			<ToastContainer />
		</UserContextProvider>
	);
}
