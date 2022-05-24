import dynamic from "next/dynamic";
import theme from "../theme"
import { ThemeProvider } from "theme-ui";


const Seo = dynamic(import("../components/seo"));
const Banner = dynamic(import("../sections/banner"));

export default function IndexPage() {
	return (
		<ThemeProvider theme={theme}>
			
				<Seo
					title="Task Scheduler"
					description="Schedule tasks for your teammates"
				/>	
				<Banner />
			
		</ThemeProvider>
	);
}
