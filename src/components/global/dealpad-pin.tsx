import { Dimensions, View } from "react-native";

interface IProps {
	password: number[];
	pinSize: number;
	dialPadContent: Array<number | string>;
}

const { width } = Dimensions.get("window");
const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;

const DealpadPin = (props: IProps) => {
	const { password, pinSize, dialPadContent } = props;
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				gap: 14,
				justifyContent: "center",
				marginBottom: 50,
			}}>
			{[...new Array(pinSize)].map((_, index) => {
				const item = dialPadContent[index];
				const isSelected =
					typeof item === "number" && password[index] !== undefined;
				return (
					<View
						key={index}
						style={{
							width: 30,
							height: 30,
							borderColor: "#6236ff",
							borderWidth: 2,
							borderRadius: 100,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}>
						{isSelected && (
							<View
								style={{
									width: 22,
									height: 22,
									borderRadius: 100,
									backgroundColor: "#6236ff",
								}}
							/>
						)}
					</View>
				);
			})}
		</View>
	);
};

export default DealpadPin;
