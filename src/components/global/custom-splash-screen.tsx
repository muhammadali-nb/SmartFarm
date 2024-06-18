import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";

const CustomSplashScreen = () => {
	return (
		<SafeAreaView style={styles.splashScreenContainer}>
			<ActivityIndicator />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	splashScreenContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
});

export default CustomSplashScreen;
