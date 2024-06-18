import { View, Text } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { tokens } from "src/localization/tokens";

const ProfileHeader = () => {
	const insets = useSafeAreaInsets();
	const { t } = useTranslation();

	return (
		<View
			style={{
				paddingTop: insets.top + 10,
				paddingBottom: "30%",
			}}>
			<Text
				style={{
					textAlign: "center",
					fontSize: 22,
					fontWeight: "500",
				}}>
				{t(tokens.title.profile)}
			</Text>
		</View>
	);
};

export default ProfileHeader;
