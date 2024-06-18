import { View, Text, StyleSheet, ViewStyle, Pressable } from "react-native";
import { ReactNode } from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface IProps {
	style?: ViewStyle;
	title: string;
	onPress?: () => void;
}

const ProfileBodyRow = (props: IProps) => {
	const { style, title, onPress } = props;

	return (
		<Pressable onPress={onPress} style={[styles.profileBodyRow, style]}>
			<Text style={styles.profileBodyRowText}>{title}</Text>
			<MaterialIcons name="navigate-next" size={20} color="black" />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	profileBodyRow: {
		paddingVertical: 12,
		borderColor: "#ededf5",
		borderBottomWidth: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	profileBodyRowText: {
		// fontWeight: "500",
		fontSize: 16,
	},
});

export default ProfileBodyRow;
