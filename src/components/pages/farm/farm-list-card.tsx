import { View, Text, ViewStyle } from "react-native";
import { ReactNode } from "react";

interface IProps {
	icon: ReactNode;
	name: string;
	style?: ViewStyle;
}

const FarmListCard = (props: IProps) => {
	const { icon, name, style } = props;
	return (
		<View
			style={[
				{
					flex: 1,
					backgroundColor: "#6236ff",
					height: 124,
					borderRadius: 20,
					padding: 10,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				},
				style,
			]}>
			{icon}
			<View
				style={{
					justifyContent: "flex-end",
					marginTop: 8,
					height: 36,
				}}>
				<Text
					style={{
						color: "#fff",
						fontWeight: "500",
						textAlign: "center",
						textAlignVertical: "bottom",
						fontSize: 10,
					}}>
					{name}
				</Text>
			</View>
		</View>
	);
};

export default FarmListCard;
