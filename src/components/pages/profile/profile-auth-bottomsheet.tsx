//@ts-nocheck
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { forwardRef, useCallback, useLayoutEffect, useState } from "react";
import { Switch, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";

import { FontAwesome } from "@expo/vector-icons";
import CustomBackdrop from "src/components/global/custom-backdrop";
import { useLocalAuth } from "src/hooks/use-local-auth";
import { useRouter } from "expo-router";
import { checkBiometricType } from "src/utils/local-auth";

interface IProps {
	title?: string;
}

const ProfileAuthBottomSheet = forwardRef<BottomSheet, IProps>((props, ref) => {
	const {
		toggleLocalAuth,
		isLocalAuthEnabled,
		toggleBiometricAuth,
		isBiometricAuth,
	} = useLocalAuth();
	const [biometricType, setBiometricType] = useState<string | null>(null);
	const router = useRouter();
	useLayoutEffect(() => {
		checkBiometricType().then((type) => setBiometricType(type));
	}, []);

	const checkSavedPassword = async () => {
		const password = await SecureStore.getItemAsync("savedPassword");
		if (!password) {
			router.push("/local-auth/add-auth");
		}
	};

	const renderBackdrop = useCallback(
		(props) => (
			<CustomBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				onPress={() => ref.current?.close()}
			/>
		),
		[]
	);

	return (
		<BottomSheetModal
			ref={ref}
			enableOverDrag={false}
			snapPoints={["40%"]}
			backdropComponent={renderBackdrop}
			backgroundStyle={{
				backgroundColor: "#ededf5",
				borderRadius: 25,
			}}
			handleIndicatorStyle={{
				backgroundColor: "#6236ff",
			}}
			{...props}>
			<View style={{ flex: 1, alignItems: "center" }}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}>
					<Text
						style={{
							marginRight: 6,
							fontWeight: "500",
							fontSize: 16,
						}}>
						Код и пароль
					</Text>
					<FontAwesome name="lock" size={24} color="black" />
				</View>

				<View
					style={{
						width: "100%",
						paddingHorizontal: 20,
						marginTop: 34,
					}}>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							marginBottom: 10,
						}}>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "500",
							}}>
							Локальная аутентификация
						</Text>
						<Switch
							onValueChange={() => {
								toggleLocalAuth(!isLocalAuthEnabled);
								checkSavedPassword();
							}}
							value={isLocalAuthEnabled}
						/>
					</View>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "500",
							}}>
							{biometricType}
						</Text>
						<Switch
							onValueChange={() => toggleBiometricAuth(!isBiometricAuth)}
							value={isBiometricAuth}
						/>
					</View>
				</View>
			</View>
		</BottomSheetModal>
	);
});

export default ProfileAuthBottomSheet;
