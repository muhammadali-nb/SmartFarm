import { Stack } from "expo-router";


const ModalsLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name="lock" options={{ animation: "none" }} />
			<Stack.Screen name="white" options={{ animation: "none" }} />
		</Stack>
	);
};

export default ModalsLayout;
