import { View, Text, ViewStyle } from "react-native";

interface IProps {
	style?: ViewStyle;
}

const ProdileUserCard = (props: IProps) => {
	const { style } = props;

	return (
		<View
			style={[
				{
					display: "flex",
					alignItems: "center",
				},
				style,
			]}>
			<Text
				style={{
					fontSize: 12,
					color: "#687691",
					fontWeight: "500",
				}}>
				@Arnoldy
			</Text>
			<Text
				style={{
					fontSize: 22,
					fontWeight: "500",
					marginTop: 6,
				}}>
				Arnoldy Doe
			</Text>
			<Text
				style={{
					fontSize: 12,
					marginTop: 4,
				}}>
				Joined 18 june
			</Text>
		</View>
	);
};

export default ProdileUserCard;
