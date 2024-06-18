import { StyleSheet, Text, TextInput, View } from "react-native";
import { IInputProps } from "./input";

function InputPassword(
	props: Omit<IInputProps, "icon" | "secureTextEntry" | "keyboardType">
) {
	const {
		placeholder,
		onChangeText,
		onBlur,
		value,
		isError,
		style,
		textAlign,
	} = props;

	return (
		<View style={[styles.inputContainer, style]}>
			<View
				style={{
					justifyContent: "center",
				}}>
				<TextInput
					onChangeText={onChangeText}
					onBlur={onBlur}
					value={value}
					placeholder={placeholder}
					style={[styles.input, isError ? styles.inputError : null]}
					textAlign={textAlign}
					keyboardType={"numeric"}
					placeholderTextColor="#747578"
					maxLength={4}
				/>
			</View>
			{isError ? (
				<Text style={styles.inputErrorText}>{isError}</Text>
			) : (
				<View style={{ height: 20.5 }} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		position: "relative",
	},
	input: {
		backgroundColor: "#efebff",
		borderColor: "#6236ff",
		paddingHorizontal: 12,
		paddingVertical: 16,
		borderRadius: 8,
		fontSize: 20,
		fontWeight: "500",
	},
	inputError: {
		borderColor: "red",
		borderWidth: 1,
	},
	inputErrorText: {
		color: "red",
		fontSize: 10,
		marginVertical: 4,
	},
});

export default InputPassword;
