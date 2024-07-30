import { router } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Animated, Text, View } from "react-native";
import CustomDealpad from "src/components/global/custom-dealpad";
import DealpadPin from "src/components/global/dealpad-pin";

import { useLocalAuth } from "src/hooks/use-local-auth";
import { useMounted } from "src/hooks/use-mounted";
import { useShakeAnimation } from "src/hooks/use-shake-animation";
import { checkBiometricType, handlePasswordAuth } from "src/utils/local-auth";

const pinSize = 4;

const LocalAuthNumpad = () => {
	const [authStatus, setAuthStatus] = useState(null);
	const [password, setPassword] = useState([]);
	const [biometricType, setBiometricType] = useState(null);
	const { shake, shakeAnim, isShaking } = useShakeAnimation();
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
		checkBiometricType().then((type) => setBiometricType(type));
	}, []);

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

	useEffect(() => {
		if (password.length === pinSize) {
			handlePasswordAuth(password)
				.then(() => {
					setTimeout(() => {
						router.push("/home");
						setPassword([]);
						setAuthStatus("");
					}, 300);
				})
				.catch((err) => {
					shake();
					setAuthStatus(err.message);
					setPassword([]);
				});
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
						if (isShaking === "shaking") return;
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
