import { View, Text } from "react-native";

import { Slot, Stack } from "expo-router";

const IndentifyLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name="all" />
			<Stack.Screen name="animal-list" />
		</Stack>
	);
};

export default IndentifyLayout;
