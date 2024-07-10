import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useLayoutEffect } from "react";

//for localization
import { useTranslation } from "react-i18next";
import { tokens } from "src/localization/tokens";
import "../src/localization/i18next";
import { Language } from "../src/localization/i18next";

import { AuthProvider } from "src/context/auth-context";
import BottomSheetProvider from "src/context/bottomsheet-context";
import { LocalAuthProvider } from "src/context/local-auth-context";
import { UserInactivity } from "src/context/user-inactivity";

const defaultLanguage: Language = "ru";

SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
	const { t, i18n } = useTranslation();

	useEffect(() => {
		const prepare = async () => {
			await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate a loading task
			await SplashScreen.hideAsync();
		};

		prepare();
	}, []);

	useLayoutEffect(() => {
		setDefaultLanguage();
	}, []);

	const setDefaultLanguage = async () => {
		try {
			const language = await AsyncStorage.getItem("defaultLanguage");
			if (language) {
				i18n.changeLanguage(language);
			} else {
				await AsyncStorage.setItem("defaultLanguage", defaultLanguage);
				i18n.changeLanguage(defaultLanguage);
			}
		} catch (error) {
			console.error("Error setting default language:", error);
		}
	};

	return (
		<BottomSheetProvider>
			<AuthProvider>
				<LocalAuthProvider>
					<UserInactivity>
						<Stack
							screenOptions={{
								headerBackTitle: t(tokens.common.back),
								headerShown: false,
							}}>
							<Stack.Screen
								name="(tabs)"
								options={{ animation: "none", gestureEnabled: false }}
							/>
							<Stack.Screen name="(drawer)" />
							<Stack.Screen name="(modals)" options={{ animation: "none" }} />
							<Stack.Screen name="login" />
							<Stack.Screen name="local-auth" />
							<Stack.Screen name="about" />
							<Stack.Screen name="room" />
						</Stack>
					</UserInactivity>
				</LocalAuthProvider>
			</AuthProvider>
		</BottomSheetProvider>
	);
};

export default RootLayout;
