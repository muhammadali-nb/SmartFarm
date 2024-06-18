import { View, Text, TouchableOpacity } from "react-native";

import { Entypo } from "@expo/vector-icons";

const Balance = () => {
	return (
		<View
			style={{
				backgroundColor: "#fff",
				padding: 30,
				borderRadius: 14,
			}}>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}>
				<View>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "600",
						}}>
						Total Balance
					</Text>
					<Text
						style={{
							fontSize: 26,
							fontWeight: "700",
							marginTop: 4,
						}}>
						$ 2,562.50
					</Text>
				</View>
				<TouchableOpacity
					style={{
						backgroundColor: "#efebff",
						height: 60,
						width: 50,
						borderRadius: 12,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Entypo name="plus" size={28} color="#6236ff" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Balance;
