import { View, Image, TouchableOpacity } from "react-native";
import Container from "src/components/global/container";
import { Entypo } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalAuth } from "src/hooks/useLocalAuth";

const HomeHeader = () => {
	const insets = useSafeAreaInsets();
	const { logout } = useLocalAuth();
	return (
		<View
			style={{
				paddingTop: insets.top + 10,
				backgroundColor: "#6236ff",
				paddingBottom: 20,
			}}>
			<Container>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}>
					<View style={{ width: 30 }} />
					<Image
						source={require("../../../assets/logo.png")}
						style={{
							height: 50,
							width: 90,
						}}
					/>
					<TouchableOpacity
						onPress={() => logout()}
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}>
						<Entypo name="plus" size={28} color="white" />
					</TouchableOpacity>
				</View>
			</Container>
		</View>
	);
};

export default HomeHeader;
