import { View, Text, StyleSheet } from "react-native";
import { useCallback, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Container from "src/components/global/container";
import ProfileBodyRow from "./profile-body-row";
import CustomBackdrop from "src/components/global/custom-backdrop";

import ProfileUserIcon from "./profile-user-icon";
import ProfileUserCard from "./profile-user-card";
import ProfilelanguageBottomSheet from "./profile-language-bottomsheet";
import ProfileAuthBottomSheet from "./profile-auth-bottomsheet";
import { tokens } from "src/localization/tokens";
import { useTranslation } from "react-i18next";

const ProfileBody = () => {
	const { t } = useTranslation();
	const bottomSheetModalLanguageRef = useRef<BottomSheetModal>(null);
	const bottomSheetModalAuthRef = useRef<BottomSheetModal>(null);

	// callbacks
	const handleLanguageModalPress = useCallback(() => {
		bottomSheetModalLanguageRef.current?.present();
	}, []);

	const handleAuthModalPress = useCallback(() => {
		bottomSheetModalAuthRef.current?.present();
	}, []);

	return (
		<GestureHandlerRootView style={styles.profileBody}>
			<ProfileUserIcon style={styles.profileBodyUserIcon} />
			<Container>
				<ProfileUserCard />
				<View style={styles.profileBodyList}>
					<ProfileBodyRow
						title={t(tokens.pages.profile.options_list.language)}
						onPress={handleLanguageModalPress}
					/>
					<ProfileBodyRow
						title={t(tokens.pages.profile.options_list.local_auth)}
						onPress={handleAuthModalPress}
					/>
				</View>
			</Container>
			<ProfilelanguageBottomSheet ref={bottomSheetModalLanguageRef} />
			<ProfileAuthBottomSheet ref={bottomSheetModalAuthRef} />
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	profileBody: {
		backgroundColor: "#fff",
		height: "100%",
		borderTopRightRadius: 40,
		borderTopLeftRadius: 40,
		paddingTop: 70,
		position: "relative",
	},
	profileBodyUserIcon: {
		position: "absolute",
		zIndex: 2,
		top: -50,
		alignSelf: "center",
	},
	profileBodyList: {
		marginTop: 30,
	},
});

export default ProfileBody;
