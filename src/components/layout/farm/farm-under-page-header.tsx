import { View, Text, StyleSheet, Pressable } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import Container from "src/components/global/container";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const FarmUnderPageHeader = ({ title }: { title: string }) => {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.farmUnderPageHeader, { paddingTop: insets.top + 10 }]}>
			<Container>
				<View style={styles.farmUnderPageHeaderContainer}>
					<Pressable onPress={() => router.back()}>
						<Ionicons name="arrow-back" size={24} color="white" />
					</Pressable>

					<Text style={styles.farmUnderPageHeaderTitle}>{title}</Text>
					<View style={{ width: 24 }} />
				</View>
			</Container>
		</View>
	);
};

const styles = StyleSheet.create({
	farmUnderPageHeader: {
		backgroundColor: "#6236ff",
		paddingBottom: 20,
	},
	farmUnderPageHeaderContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	farmUnderPageHeaderTitle: {
		fontWeight: "600",
		fontSize: 18,
		color: "#fff",
	},
});

export default FarmUnderPageHeader;
