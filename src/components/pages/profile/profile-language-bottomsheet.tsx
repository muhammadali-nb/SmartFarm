//@ts-nocheck
import { View, Text, Alert } from "react-native";
import { forwardRef, useCallback, useLayoutEffect, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import CustomBackdrop from "src/components/global/custom-backdrop";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import ProfileLanguageSelectButton from "./profile-language-select-btn";

import { Ionicons } from "@expo/vector-icons";
import Uzbekistan from "src/icons/flags/uzbekistan";
import Russia from "src/icons/flags/russia";

import { useTranslation } from "react-i18next";
import { Language } from "src/localization/i18next";
import { tokens } from "src/localization/tokens";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface IProps {
	title?: string;
}

const ProfilelanguageBottomSheet = forwardRef<BottomSheet, IProps>(
	(props, ref) => {
		const { i18n, t } = useTranslation();
		const [selected, setSelected] = useState<"ru" | "uz">("uz");

		useLayoutEffect(() => {
			defineDefaultLng();
		}, []);

		const handleChange = useCallback(
			async (language: Language): Promise<void> => {
				setSelected(language);
				await i18n.changeLanguage(language);
				const message = t(tokens.common.languageChanged) as string;
				Alert.alert(message);
				ref.current?.close();
				await AsyncStorage.setItem("defaultLanguage", language);
			},
			[i18n, t]
		);

		const defineDefaultLng = async () => {
			const defaultLanguage = (await AsyncStorage.getItem(
				"defaultLanguage"
			)) as Language;
			if (defaultLanguage) {
				setSelected(defaultLanguage);
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
				<View style={{ flex: 1, alignItems: "center", paddingHorizontal: 20 }}>
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
							{t(tokens.languageBottomSheet.title)}
						</Text>
						<Ionicons name="language" size={24} color="black" />
					</View>

					<View
						style={{
							marginTop: 34,
						}}>
						<ProfileLanguageSelectButton
							id={"uz"}
							value={selected}
							onPress={() => handleChange("uz")}
							icon={<Uzbekistan />}
							name={t(tokens.languageBottomSheet.uz)}
						/>
						<ProfileLanguageSelectButton
							id={"ru"}
							value={selected}
							onPress={() => handleChange("ru")}
							icon={<Russia />}
							name={t(tokens.languageBottomSheet.ru)}
						/>
					</View>
				</View>
			</BottomSheetModal>
		);
	}
);

export default ProfilelanguageBottomSheet;
