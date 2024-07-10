import { View, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const VideoChatLayout = () => {
	return (
		<SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
			<Slot />
		</SafeAreaView>
	);
};

export default VideoChatLayout;
