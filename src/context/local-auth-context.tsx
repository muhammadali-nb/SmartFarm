import { ReactNode, createContext, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen } from "expo-router";

interface LocalAuthContextType {
	isAuthenticated: boolean;
	isLocalAuthEnabled: boolean;
	isBiometricAuth: boolean;
	loading: boolean;
	authenticate: () => Promise<void>;
	logout: () => Promise<void>;
	toggleLocalAuth: (enabled: boolean) => Promise<void>;
	toggleBiometricAuth: (enabled: boolean) => Promise<void>;
}

export const LocalAuthContext = createContext<LocalAuthContextType | undefined>(
	undefined
);

export const LocalAuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isLocalAuthEnabled, setIsLocalAuthEnabled] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [biometricAuth, setIsBiometricAuth] = useState(false);
	const [loading, setLoading] = useState(true);

	useLayoutEffect(() => {
		const loadLocalAuthData = async () => {
			const authData = await AsyncStorage.getItem("localAuthData");
			if (authData) {
				const { isAuthenticated, isLocalAuthEnabled, isBiometricAuth } =
					JSON.parse(authData);
				setIsAuthenticated(isAuthenticated);
				setIsLocalAuthEnabled(isLocalAuthEnabled);
				setIsBiometricAuth(isBiometricAuth);
			}
			await SplashScreen.hideAsync();
			setLoading(false);
		};
		loadLocalAuthData();
	}, []);

	const saveLocalAuthData = async (authData: object) => {
		await AsyncStorage.setItem("localAuthData", JSON.stringify(authData));
	};

	const authenticate = async () => {
		// Perform local authentication here (e.g., biometric or password)
		setIsAuthenticated(true);
		await saveLocalAuthData({ isAuthenticated: true, isLocalAuthEnabled });
	};

	const logout = async () => {
		setIsAuthenticated(false);
		await saveLocalAuthData({ isAuthenticated: false, isLocalAuthEnabled });
	};

	const toggleLocalAuth = async (enabled: boolean) => {
		setIsLocalAuthEnabled(enabled);
		await saveLocalAuthData({
			isAuthenticated,
			isLocalAuthEnabled: enabled,
			isBiometricAuth: biometricAuth,
		});
	};

	const toggleBiometricAuth = async (enabled: boolean) => {
		setIsBiometricAuth(enabled);
		await saveLocalAuthData({
			isAuthenticated,
			isLocalAuthEnabled,
			isBiometricAuth: enabled,
		});
	};

	return (
		<LocalAuthContext.Provider
			value={{
				isAuthenticated,
				isLocalAuthEnabled,
				isBiometricAuth: biometricAuth,
				loading,
				authenticate,
				logout,
				toggleLocalAuth,
				toggleBiometricAuth,
			}}>
			{children}
		</LocalAuthContext.Provider>
	);
};
