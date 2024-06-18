import { View, Text } from "react-native";

import { Stack } from "expo-router";

const FarmDivisionLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="all" />
		</Stack>
	);
};

export default FarmDivisionLayout;
