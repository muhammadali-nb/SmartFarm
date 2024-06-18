import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface IButton {
	style?: ViewStyle;
	text: string;
	onPress?: () => void;
}

const Button = (props: IButton) => {
	const { style, text, onPress } = props;

	return (
		<TouchableOpacity onPress={onPress} style={[styles.button, style]}>
			<Text style={styles.buttonText}>{text ?? "Click me"}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 14,
		paddingHorizontal: 20,
		backgroundColor: "#6236ff",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#fff",
	},
});

export default Button;
