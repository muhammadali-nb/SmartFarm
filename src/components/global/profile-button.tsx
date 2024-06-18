import { View, Text, Image } from "react-native";

const ProfileButton = () => {
	return (
		<View>
			<Image
				style={{ width: 34, height: 34, overflow: "hidden", borderRadius: 8 }}
				source={require("../../assets/user/user-image.jpg")}
			/>
		</View>
	);
};

export default ProfileButton;
