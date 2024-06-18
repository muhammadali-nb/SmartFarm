import { useRouter } from "expo-router";
import { PropsWithChildren, useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { MMKV } from "react-native-mmkv";
import { useLocalAuth } from "src/hooks/useLocalAuth";

const storage = new MMKV({
	id: "user-inactivity",
});

const LockTime = 3000;
export const UserInactivity = ({ children }: PropsWithChildren) => {
	const { isLocalAuthEnabled } = useLocalAuth();
	const appState = useRef(AppState.currentState);
	const router = useRouter();
	useEffect(() => {
		if (isLocalAuthEnabled) {
			const subscription = AppState.addEventListener(
				"change",
				handleAppStateChange
			);
			return () => subscription.remove();
		}
	}, [isLocalAuthEnabled]);

	const handleAppStateChange = (nextAppState: AppStateStatus) => {
		if (nextAppState === "inactive") {
			router.push("/(modals)/white");
		} else {
			if (router.canGoBack()) {
				router.back();
			}
		}

		if (nextAppState === "background") {
			recordStartTime();
		} else if (
			nextAppState === "active" &&
			appState.current.match(/background/)
		) {
			const elapsed = Date.now() - (storage.getNumber("startTime") || 0);
			if (elapsed > LockTime) {
				router.push("/(modals)/lock");
			}
		}
		appState.current = nextAppState;
	};

	const recordStartTime = () => {
		storage.set("startTime", Date.now());
	};

	return children;
};
