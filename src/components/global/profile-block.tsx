import { View, Text, Image, StyleSheet, Pressable } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const ProfileBlock = () => {
	const navigation = useNavigation();
	return (
		<View style={styles.profileBlock}>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					alignItems: "center",
				}}>
				<Image
					source={require("../../assets/user/user-image.jpg")}
					style={styles.profileBlockImage}
				/>
				<View style={{ marginLeft: 16 }}>
					<Text style={styles.profileBlockName}>Sebastian Doe</Text>
					<Text style={styles.profileBlockId}>4029209</Text>
				</View>
			</View>
			<Pressable
				onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
				<AntDesign name="close" size={24} color="#6236ff" />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	profileBlock: {
		display: "flex",
		flexDirection: "row",
	},
	profileBlockImage: { width: 36, height: 36, borderRadius: 10 },
	profileBlockName: {
		fontWeight: "500",
		fontSize: 16,
	},
	profileBlockId: {
		fontSize: 14,
		color: "#a9abad",
		marginTop: 4,
	},
});

export default ProfileBlock;
