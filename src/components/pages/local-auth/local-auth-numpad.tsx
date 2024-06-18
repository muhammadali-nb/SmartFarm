import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useLayoutEffect, useState } from "react";
import { Animated, Text, View } from "react-native";
import CustomDealpad from "src/components/global/custom-dealpad";
import DealpadPin from "src/components/global/dealpad-pin";

import { useLocalAuth } from "src/hooks/useLocalAuth";
import { useMounted } from "src/hooks/useMounted";
import { useShakeAnimation } from "src/hooks/useShakeAnimation";

const pinSize = 4;

const LocalAuthNumpad = () => {
	const [authStatus, setAuthStatus] = useState(null);
	const [password, setPassword] = useState([]);
	const [biometricType, setBiometricType] = useState(null);
	const { shake, shakeAnim } = useShakeAnimation();
	const { isBiometricAuth } = useLocalAuth();
	const isMounted = useMounted();
	const dialPadContent = [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		isBiometricAuth ? "biometric-auth" : "space",
		0,
		"del",
	];

	useEffect(() => {
		if (isMounted && isBiometricAuth) {
			handleBiometricAuth();
		}
	}, []);

	useLayoutEffect(() => {
		checkBiometricType();
	}, []);

	const checkBiometricType = async () => {
		const supportedTypes =
			await LocalAuthentication.supportedAuthenticationTypesAsync();
		if (
			supportedTypes.includes(
				LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
			)
		) {
			setBiometricType("Face ID");
		} else if (
			supportedTypes.includes(
				LocalAuthentication.AuthenticationType.FINGERPRINT
			)
		) {
			setBiometricType("Отпечаток пальца");
		} else {
			setBiometricType(null);
		}
	};

	const handleBiometricAuth = async () => {
		let promptMessage = "Пожалуйста, подтвердите свою личность";
		if (biometricType === "Face ID") {
			promptMessage = "Пожалуйста, подтвердите свою личность с помощью Face ID";
		} else if (biometricType === "Отпечаток пальца") {
			promptMessage =
				"Пожалуйста, подтвердите свою личность с помощью отпечатка пальца";
		}

		const result = await LocalAuthentication.authenticateAsync({
			promptMessage,
		});

		if (result.success) {
			setAuthStatus("Аутентификация успешна");
			router.push("/home");
			setPassword([]);
		} else {
			setAuthStatus("Аутентификация не удалась");
		}
	};

	const handlePasswordAuth = async () => {
		if (password.length <= 0) {
			setAuthStatus("Пожалуйста, введите пароль");
			return;
		}

		// Пример: проверка пароля
		if (
			password.join("") !== (await SecureStore.getItemAsync("savedPassword"))
		) {
			shake();
			setAuthStatus("Неправильный пароль");
			setPassword([]);
			return;
		}

		// Добавьте здесь вашу логику для перехода на следующий экран или выполнения действий после успешной аутентификации
		setAuthStatus("Аутентификация успешна");

		setTimeout(() => {
			router.push("/home");
			setPassword([]);
			setAuthStatus("");
		}, 300);
	};

	useEffect(() => {
		if (password.length === pinSize) {
			handlePasswordAuth();
		}
	}, [password]);

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<View>
				<Text style={{ marginBottom: 10, textAlign: "center" }}>
					{authStatus}
				</Text>
				<Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
					<DealpadPin
						pinSize={pinSize}
						dialPadContent={dialPadContent}
						password={password}
					/>
				</Animated.View>

				<CustomDealpad
					dialPadContent={dialPadContent}
					biometricAuthType={
						biometricType === "Face ID" ? "face-id" : "touch-id"
					}
					onPress={(item) => {
						if (item === "del") {
							setPassword((prev) => prev.slice(0, prev.length - 1));
						} else if (item === "biometric-auth") {
							handleBiometricAuth();
						} else if (typeof item === "number") {
							if (pinSize === password.length) return;
							setPassword((prev) => [...prev, item]);
						}
					}}
				/>
			</View>
		</View>
	);
};

export default LocalAuthNumpad;
