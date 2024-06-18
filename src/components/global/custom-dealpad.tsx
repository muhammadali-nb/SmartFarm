import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;

const CustomDealpad = ({
	biometricAuthType,
	onPress,
	dialPadContent,
}: {
	biometricAuthType: "face-id" | "touch-id";
	onPress: (item: (typeof dialPadContent)[number]) => void;
	dialPadContent: Array<string | number>;
}) => {
	return (
		<FlatList
			data={dialPadContent}
			scrollEnabled={false}
			style={{
				flexGrow: 0,
			}}
			numColumns={3}
			keyExtractor={(_, index) => index.toString()}
			renderItem={({ item }) => {
				return (
					<TouchableOpacity onPress={() => onPress(item)}>
						<View
							style={[
								{
									width: dialPadSize,
									height: dialPadSize,
									borderColor:
										item !== "del" &&
										item !== "biometric-auth" &&
										item !== "space"
											? "#6236ff"
											: "transparent",
								},
								styles.dialPadContainer,
							]}>
							{item === "del" ? (
								<Feather name="delete" size={30} color="black" />
							) : item === "biometric-auth" ? (
								biometricAuthType !== "face-id" ? (
									<Entypo name="fingerprint" size={38} color="black" />
								) : (
									<MaterialCommunityIcons
										name="line-scan"
										size={34}
										color="black"
									/>
								)
							) : item === "space" ? (
								<View />
							) : (
								<Text style={styles.dialPadText}>{item}</Text>
							)}
						</View>
					</TouchableOpacity>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	dialPadContainer: {
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
		borderRadius: 24,
		borderWidth: 0.5,
	},
	dialPadText: {
		fontWeight: "500",
		fontSize: dialPadTextSize,
	},
});

export default CustomDealpad;
