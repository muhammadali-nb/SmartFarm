import { ReactNode, useEffect } from "react";
import {
	KeyboardTypeOptions,
	NativeSyntheticEvent,
	StyleSheet,
	Text,
	TextInput,
	TextInputFocusEventData,
	View,
	ViewStyle,
} from "react-native";

export interface IInputProps {
	placeholder: string;
	onChangeText: (e: string) => void;
	onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	value: string;
	isError?: null | string | number;
	style?: ViewStyle;
	keyboardType?: KeyboardTypeOptions;
	icon?: ReactNode;
	secureTextEntry?: boolean;
	textAlign?: "center" | "left" | "right";
}

function Input(props: IInputProps) {
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
		textAlign,
	} = props;

	return (
		<View style={[styles.inputContainer, style]}>
			<View
				style={{
					justifyContent: "center",
				}}>
				{icon ?? null}
				<TextInput
					onChangeText={onChangeText}
					onBlur={onBlur}
					value={value}
					secureTextEntry={secureTextEntry}
					placeholder={placeholder}
					style={[
						styles.input,
						isError ? styles.inputError : null,
						icon ? styles.inputIcon : null,
					]}
					textAlign={textAlign}
					keyboardType={keyboardType}
					placeholderTextColor="#747578"
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
		fontSize: 16,
		fontWeight: "500",
	},
	inputIcon: {
		paddingLeft: 46,
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

export default Input;
