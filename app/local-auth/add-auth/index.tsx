import { useState } from "react";
import { View, Text, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import LocalAuthInput from "src/components/pages/local-auth/local-auth-input";
import Button from "src/components/global/button";

const AddLocalAuth = () => {
	const [password, setPassword] = useState("");

	const handleSavePassword = async () => {
		if (password === "") {
			Alert.alert("Ошибка", "Пожалуйста, введите пароль");
			return;
		}
		try {
			await SecureStore.setItemAsync("savedPassword", password);
			Alert.alert("Успех", "Пароль успешно сохранен");
			router.push("/home");
		} catch (error) {
			Alert.alert("Ошибка", "Не удалось сохранить пароль");
		}
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text
				style={{
					fontSize: 14,
				}}>
				Введите пароль для сохранения
			</Text>
			<LocalAuthInput
				style={{
					height: 40,
					width: 200,
					borderColor: "gray",
					marginTop: 14,
					borderWidth: 1,
				}}
				onChangeText={(text) => setPassword(text)}
				value={password}
				placeholder="Пароль"
				secureTextEntry={true}
			/>

			<Button
				text="Сохранить"
				onPress={() => handleSavePassword()}
				style={{
					marginTop: 20,
				}}
			/>
		</View>
	);
};

export default AddLocalAuth;
