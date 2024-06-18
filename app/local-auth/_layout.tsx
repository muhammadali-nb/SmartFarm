import { Stack } from "expo-router";
import { useLocalAuth } from "src/hooks/useLocalAuth";

const LocalAuthLayout = () => {
	const { isAuthenticated } = useLocalAuth();

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name="add-auth" />
		</Stack>
	);
};

export default LocalAuthLayout;
