import { View, Text, TouchableOpacity } from "react-native";
import { ReactElement } from "react";
import Uzbekistan from "src/icons/flags/uzbekistan";

interface IProps {
	onPress?: () => void;
	id: string;
	value: string;
	name: string;
	icon: ReactElement;
}

const ProfileLanguageSelectButton = (props: IProps) => {
	const { onPress, id, value, icon, name } = props;

	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
				paddingVertical: 12,
			}}>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}>
				{icon}
				<Text
					style={{
						// fontWeight: "500",
						fontSize: 16,
						marginLeft: 14,
					}}>
					{name}
				</Text>
			</View>

			<View
				style={{
					borderWidth: 2,
					borderColor: "#6236ff",
					width: 20,
					height: 20,
					borderRadius: 50,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}>
				{id === value ? (
					<View
						style={{
							width: 12,
							height: 12,
							backgroundColor: "#6236ff",
							borderRadius: 50,
						}}
					/>
				) : null}
			</View>
		</TouchableOpacity>
	);
};

export default ProfileLanguageSelectButton;
