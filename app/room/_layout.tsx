import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Room = () => {
	return (
		<SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
			<Slot />
		</SafeAreaView>
	);
};

export default Room;
