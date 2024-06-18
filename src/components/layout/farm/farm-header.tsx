import { View, Text, Image, StyleSheet, Pressable } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import Container from "src/components/global/container";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const FarmHeader = () => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	return (
		<View style={[styles.farmHeader, { paddingTop: insets.top + 6 }]}>
			<Container>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}>
					<Pressable
						onPress={() => navigation.goBack()}
						style={{
							width: 36,
						}}>
						<Ionicons name="arrow-back" size={26} color="white" />
					</Pressable>
					<View
						style={{
							display: "flex",
							alignItems: "center",
						}}>
						<Text style={styles.farmHeaderName}>Ghosht group</Text>
						{/* <Text style={styles.farmHeaderAddress}>Chilonzor 3/12</Text> */}
						<Text style={styles.farmHeaderStatus}>Активный</Text>
					</View>

					<Image
						source={require("../../../assets/cattle-farm-logo.jpeg")}
						style={{
							width: 32,
							height: 32,
							borderRadius: 50,
							marginRight: 10,
						}}
					/>
				</View>
			</Container>
		</View>
	);

	return (
		<View style={[styles.farmHeader, { paddingTop: insets.top + 6 }]}>
			<Container>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}>
					<Pressable onPress={() => navigation.goBack()}>
						<Ionicons
							name="chevron-back"
							size={24}
							color="#fff"
							style={{ marginRight: 10 }}
						/>
					</Pressable>
					<View style={styles.farmHeaderContainer}>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Image
								source={require("../../../assets/cattle-farm-logo.jpeg")}
								style={{
									width: 54,
									height: 54,
									borderRadius: 12,
									marginRight: 10,
								}}
							/>
							<View>
								<Text style={styles.farmHeaderName}>Ghosht group</Text>
								<Text style={styles.farmHeaderAddress}>Chilonzor 3/12</Text>
								<Text style={styles.farmHeaderStatus}>Активный</Text>
							</View>
						</View>
					</View>
				</View>
			</Container>
		</View>
	);
};

const styles = StyleSheet.create({
	farmHeader: { backgroundColor: "#6236ff", paddingBottom: 14, paddingTop: 6 },
	farmHeaderContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	farmHeaderName: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
	},
	farmHeaderAddress: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "500",
		marginTop: 2,
	},
	farmHeaderStatus: {
		color: "#52bf4e",
		fontSize: 10,
		fontWeight: "500",
	},
});

export default FarmHeader;
