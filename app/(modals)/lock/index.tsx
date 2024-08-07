import { Alert, Text, View } from "react-native";
import LocalAuthNumpad from "src/components/pages/local-auth/local-auth-numpad";

const AuthenticationPage = () => {
	
	const showConfirmedAlert = () => {
		Alert.alert(
			"Alert Title",
			"My Alert Msg",
			[
				{ text: "OK", onPress: () => handleForgetPassword() },
				{ text: "Cancel" },
			],

			{ cancelable: false }
		);
	};

	const handleForgetPassword = () => {
		console.log("logged out");
	};

	return (
		<>
			<LocalAuthNumpad />
			<View
				style={{
					height: 64,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Text>
					Forget password?{" "}
					<Text
						onPress={() => showConfirmedAlert()}
						style={{
							color: "red",
							fontWeight: 500,
						}}>
						Logout
					</Text>
				</Text>
			</View>
		</>
	);
};

export default AuthenticationPage;
