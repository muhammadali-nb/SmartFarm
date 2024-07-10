import { Redirect } from "expo-router";
import CustomSplashScreen from "src/components/global/custom-splash-screen";
import { useAuth } from "src/hooks/use-auth";
import { useLocalAuth } from "src/hooks/use-local-auth";

const StartPage = () => {
	const { isAuthenticated: globalAuth, loading: globalLoading } = useAuth();
	const {
		isLocalAuthEnabled,
		isAuthenticated: localAuth,
		loading: localLoading,
	} = useLocalAuth();

	if (globalLoading || localLoading) {
		return <CustomSplashScreen />;
	}

	if (!globalAuth) return <Redirect href={"/login"} />;
	if (isLocalAuthEnabled && !localAuth) {
		return <Redirect href={"/(modals)/lock"} />;
	}
	return <Redirect href={"/home"} />;
};

export default StartPage;
