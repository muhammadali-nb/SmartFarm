import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import * as Google from "expo-auth-session/providers/google";

import { Formik } from "formik";
import * as Yup from "yup";

import Input from "src/components/global/input";
import Button from "src/components/global/button";
import User from "src/icons/user";
import Unlock from "src/icons/unlock";

import { useAuth } from "src/hooks/useAuth";
import { useMounted } from "src/hooks/useMounted";

const AuthTripSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, "Логин очень короткий")
		.max(24, "Логин очень длинный")
		.required("Введите ваш логин"),
	password: Yup.string()
		.min(3, "Пороль очень короткий")
		.required("Введите ваш пороль"),
});

const LoginAuthForm = () => {
	const [request, response, promptAsync] = Google.useAuthRequest({
		iosClientId:
			"268661990863-9t2mnulmu5dsi1rls90r6i2q6hmdm3l1.apps.googleusercontent.com",
		androidClientId:
			"268661990863-mb49p4ma1lnvnt03kkt3t74hsp3tao52.apps.googleusercontent.com",
	});
	const { login } = useAuth();
	const isMounted = useMounted();

	useEffect(() => {
		console.log(response);
	}, [response]);

	return (
		<TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
			<View style={styles.loginAuthForm}>
				<View style={styles.loginAuthFormContent}>
					<Text style={styles.loginAuthFormTitle}>Авторизация</Text>
					<Formik
						validationSchema={AuthTripSchema}
						initialValues={{
							name: "",
							password: "",
							submit: "",
						}}
						onSubmit={async (values, helpers) => {
							helpers.setSubmitting(true);
							try {
								const res = await login(values.name, values.password);

								console.log(res);
								if (isMounted()) {
									// const returnUrl =
									// 	router.query.returnUrl || dashboards[res.user_type];
									// router.push(returnUrl).catch(console.error);
									router.push("/home");
								}
							} catch (err) {
								if (isMounted()) {
									helpers.setStatus({ success: false });
									helpers.setErrors({ submit: err.message });
									helpers.setSubmitting(false);
								}

								console.log(err);
							}
						}}>
						{({
							handleChange,
							handleBlur,
							handleSubmit,
							values,
							errors,
							touched,
						}) => (
							<View>
								<Input
									onChangeText={handleChange("name")}
									onBlur={handleBlur("name")}
									value={values.name}
									placeholder="Логин"
									icon={
										<User
											style={{
												position: "absolute",
												left: 12,
												zIndex: 2,
											}}
										/>
									}
									style={{
										marginBottom: 4,
									}}
									isError={errors.name && touched.name ? errors.name : null}
								/>
								<Input
									onChangeText={handleChange("password")}
									onBlur={handleBlur("password")}
									value={values.password}
									placeholder="Пароль"
									icon={
										<Unlock
											style={{
												position: "absolute",
												left: 12,
												zIndex: 2,
											}}
										/>
									}
									isError={
										errors.password && touched.password ? errors.password : null
									}
								/>
								{errors.submit ? (
									<Text style={{ color: "red", textAlign: "center" }}>
										{errors.submit}
									</Text>
								) : null}

								<Button
									style={styles.loginAuthFormButton}
									text={"Вход"}
									onPress={handleSubmit}
								/>
							</View>
						)}
					</Formik>

					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginVertical: 20,
						}}>
						<View style={{ flex: 1, height: 1, backgroundColor: "grey" }} />
						<View>
							<Text style={{ width: 50, textAlign: "center", color: "grey" }}>
								или
							</Text>
						</View>
						<View style={{ flex: 1, height: 1, backgroundColor: "grey" }} />
					</View>

					<TouchableOpacity
						style={{
							backgroundColor: "#4825c2",
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							paddingHorizontal: 20,
							paddingVertical: 16,
							borderRadius: 14,
						}}>
						<Text style={{ fontSize: 14, fontWeight: "500", color: "#fff" }}>
							Войти через One ID
						</Text>
						<Image
							style={{
								width: 60,
								height: 18,
							}}
							source={require("../../../assets/one-id_logo.png")}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => promptAsync()}
						style={{
							backgroundColor: "#4825c2",
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							paddingHorizontal: 20,
							paddingVertical: 16,
							borderRadius: 14,
							marginTop: 10,
						}}>
						<Text style={{ fontSize: 14, fontWeight: "500", color: "#fff" }}>
							Войти через Google
						</Text>
						<Image
							style={{
								width: 58,
								height: 18,
							}}
							source={require("../../../assets/google_logo.png")}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>

		// <View style={styles.loginAuthForm}>

		// </View>
	);
};

const styles = StyleSheet.create({
	loginAuthForm: {
		paddingHorizontal: 10,
		width: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loginAuthFormContent: {
		maxWidth: 364,
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 18,
		paddingHorizontal: 20,
		paddingTop: 40,
		paddingBottom: 26,
	},
	loginAuthFormTitle: {
		fontSize: 24,
		fontWeight: "600",
		color: "#6236ff",
		marginBottom: 40,
		textAlign: "center",
	},
	loginAuthFormButton: {
		marginTop: 20,
	},
});

export default LoginAuthForm;
