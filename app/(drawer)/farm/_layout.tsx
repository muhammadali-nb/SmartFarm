import { Stack } from "expo-router";

const FarmLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name="[id]" />
			<Stack.Screen name="division" />
		</Stack>
	);
};

export default FarmLayout;
