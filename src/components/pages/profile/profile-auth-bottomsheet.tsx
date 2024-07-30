import {
	BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useLayoutEffect, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import CustomBackdrop from "src/components/global/custom-backdrop";
import { useLocalAuth } from "src/hooks/use-local-auth";
import { checkBiometricType } from "src/utils/local-auth";

const ProfileAuthBottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
	(props, ref) => {
		const {
			toggleLocalAuth,
			isLocalAuthEnabled,
			toggleBiometricAuth,
			isBiometricAuth,
			savedPassword,
		} = useLocalAuth();
		const [biometricType, setBiometricType] = useState<string | null>(null);
		const router = useRouter();

		useLayoutEffect(() => {
			checkBiometricType().then((type) => setBiometricType(type));
		}, []);

		const renderBackdrop = useCallback(
			(props: BottomSheetBackdropProps) => (
				<CustomBackdrop
					{...props}
					disappearsOnIndex={-1}
					appearsOnIndex={0}
					//@ts-ignore
					onPress={() => ref.current?.close()}
				/>
			),
			[]
		);

		return (
			<BottomSheetModal
				ref={ref}
				enableOverDrag={false}
				snapPoints={["30%"]}
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
									if (!savedPassword) {
										router.push("/local-auth/add-auth");
									} else {
										toggleLocalAuth(!isLocalAuthEnabled);
									}
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
						{savedPassword ? (
							<Link href={"/local-auth/change-password"} asChild>
								<TouchableOpacity
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										paddingVertical: 20,
									}}>
									<Text
										style={{
											fontSize: 16,
											fontWeight: "500",
										}}>
										Изменить пароль
									</Text>
									<MaterialIcons name="navigate-next" size={24} color="black" />
								</TouchableOpacity>
							</Link>
						) : null}
					</View>
				</View>
			</BottomSheetModal>
		);
	}
);

export default ProfileAuthBottomSheet;
