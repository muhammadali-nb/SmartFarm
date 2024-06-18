import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { IInputProps } from "src/components/global/input";

const LocalAuthInput = (props: IInputProps) => {
	const {
		placeholder,
		onChangeText,
		onBlur,
		value,
		isError,
		style,
		keyboardType,
		icon,
		secureTextEntry,
	} = props;
	const [focus, setFocus] = useState(false);

	return (
		<TextInput
			onChangeText={onChangeText}
			onBlur={onBlur}
			value={value}
			secureTextEntry={secureTextEntry}
			onFocus={() => setFocus(true)}
			placeholder={placeholder}
			style={[
				styles.input,
				isError ? styles.inputError : null,
				focus ? styles.inputFocus : null,
			]}
			keyboardType={keyboardType}
			placeholderTextColor="#747578"
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		paddingVertical: 12,
		fontSize: 20,
		fontWeight: "500",
		width: 200,
		textAlign: "center",
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
	inputFocus: {
		borderColor: "#6236ff",
		borderBottomWidth: 2,
	},
});

export default LocalAuthInput;
