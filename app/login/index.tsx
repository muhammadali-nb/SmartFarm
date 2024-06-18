import { SafeAreaView, StyleSheet } from "react-native";
import LoginAuthForm from "../../src/components/pages/login/login-auth-form";

const LoginPage = () => {
	return (
		<SafeAreaView style={styles.loginPageContainer}>
			<LoginAuthForm />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	loginPageContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default LoginPage;
