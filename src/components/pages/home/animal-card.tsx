import { Text, StyleSheet, View, Image } from "react-native";

const AnimalCard = () => {
	return (
		<View style={styles.animalCard}>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}>
				<Image
					source={require("../../../assets/cattle-farm-logo.jpeg")}
					style={styles.animalCardImage}
				/>
				<View>
					<Text style={styles.animalCardName}>Jamshid Toshmatov</Text>
					<Text style={styles.animalCardAdress}>Toskent, Chilonzor 1/32</Text>
				</View>
			</View>
			<Text style={styles.animalCardStatus}>Активный</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	animalCard: {
		minWidth: "100%",
		backgroundColor: "#fff",
		paddingHorizontal: 22,
		paddingVertical: 26,
		borderRadius: 16,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	animalCardName: {
		fontWeight: "600",
		fontSize: 16,
	},
	animalCardAdress: {
		fontSize: 11,
		marginTop: 6,
		fontWeight: "500",
		color: "#968d9e",
	},
	animalCardImage: {
		width: 48,
		height: 48,
		borderRadius: 6,
		overflow: "hidden",
		marginRight: 14,
	},

	animalCardStatus: {
		fontWeight: "600",
		fontSize: 12,
		color: "#52bf4e",
	},
});

export default AnimalCard;
