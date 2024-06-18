import { View, Image, ViewStyle } from "react-native";

interface IProps {
	style?: ViewStyle;
}

const ProfileUserIcon = (props: IProps) => {
	const { style } = props;

	return (
		<View
			style={[
				{
					width: 100,
					height: 100,
					overflow: "hidden",
					borderRadius: 200,
					borderWidth: 3,
					borderColor: "#6236ff",
				},
				style,
			]}>
			<Image
				style={{
					width: "100%",
					height: "100%",
					objectFit: "contain",
				}}
				source={require("../../../../src/assets/user/user-image.jpg")}
			/>
		</View>
	);
};

export default ProfileUserIcon;
