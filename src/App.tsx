import { useRoutes } from "react-router";
import routes from "./routes";
import { LanguageProvider } from "./components/Language/LanguageContext";

const App = () => {
	const element = useRoutes(routes);
	return <>
	<LanguageProvider>
	{element}
	</LanguageProvider>
	</>;
};

export default App;
