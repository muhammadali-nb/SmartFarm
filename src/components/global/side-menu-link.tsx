import { View, Text, StyleSheet } from "react-native";

import { AntDesign, Fontisto } from "@expo/vector-icons";

const SideMenuLink = () => {
	return (
		<View style={styles.sideMenuLink}>
			<View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
				<View style={styles.sideMenuImageContainer}>
					<Fontisto name="nav-icon-grid-a" size={18} color="#fff" />
				</View>

				<Text style={styles.sideMenuLinkTitle}>Components</Text>
			</View>
			<View
				style={{
					position: "absolute",
					right: 20,
					top: 8,
					zIndex: 2,
					paddingHorizontal: 6,
					paddingVertical: 4,
					backgroundColor: "#6236ff",
					borderRadius: 50,
				}}>
				<Text style={{ color: "#fff", fontSize: 10 }}>10</Text>
			</View>
			<AntDesign name="right" size={16} color="black" />
		</View>
	);
};

const styles = StyleSheet.create({
	sideMenuLink: {
		minWidth: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	sideMenuImageContainer: {
		width: 36,
		height: 36,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#6236ff",
		borderRadius: 50,
	},
	sideMenuLinkTitle: {
		fontSize: 16,
		fontWeight: "500",
		marginLeft: 10,
	},
});

export default SideMenuLink;
