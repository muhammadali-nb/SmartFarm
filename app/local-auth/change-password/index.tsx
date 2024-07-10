import { router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import InputPassword from "src/components/global/input-password";
import { useMounted } from "src/hooks/use-mounted";
import * as Yup from "yup";

const AnimatedView = Animated.View;
const { width } = Dimensions.get("window");

const ChangePasswordSchema = Yup.object().shape({
	password: Yup.number()
		.min(4, "Логин очень короткий")
		.required("Введите ваш логин"),
	confirm: Yup.number()
		.min(4, "Пороль очень короткий")
		.required("Введите ваш пороль"),
});

const ChangePassword = () => {
	const [isShowingBlock1, setIsShowingBlock1] = useState(true);
	const isMounted = useMounted();
	const animationValue = new Animated.Value(0);

	const toggleBlocks = () => {
		Animated.timing(animationValue, {
			toValue: isShowingBlock1 ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start(() => setIsShowingBlock1(!isShowingBlock1));
	};

	const blockContainer = {
		transform: [
			{
				translateX: animationValue.interpolate({
					inputRange: [0, 1],
					outputRange: [0, -width], // Укажите расстояние для появления слева
				}),
			},
		],
	};

	return (
		<>
			<Formik
				validationSchema={ChangePasswordSchema}
				initialValues={{
					password: "",
					confirm: "",
					submit: "",
				}}
				onSubmit={async (values, helpers) => {
					helpers.setSubmitting(true);
					console.log(values);
					try {
						if (isMounted()) {
							router.push("/home");
						}
					} catch (err) {
						if (isMounted()) {
							helpers.setErrors({ submit: err.message });
							helpers.setStatus({ success: false });
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
					<View style={styles.container}>
						{errors.submit ? (
							<Text style={{ color: "red", textAlign: "center" }}>
								{errors.submit}
							</Text>
						) : null}
						<AnimatedView
							style={[
								{
									display: "flex",
									flexDirection: "row",
									width: width * 2,
								},
								blockContainer,
							]}>
							<View style={[styles.block]}>
								<InputPassword
									placeholder={"Пароль"}
									onChangeText={handleChange("password")}
									onBlur={handleBlur("password")}
									value={values.password}
									style={styles.passwordInput}
									textAlign="center"
								/>
							</View>
							<View style={[styles.block]}>
								<InputPassword
									placeholder={"Поддтвердите пароль"}
									onChangeText={handleChange("confirm")}
									onBlur={handleBlur("confirm")}
									value={values.confirm}
									style={styles.passwordInput}
									textAlign="center"
								/>
							</View>
						</AnimatedView>
					</View>
				)}
			</Formik>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	block: {
		width: width,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 10,
	},
	passwordInput: {
		maxWidth: 300,
		width: "100%",
		textAlign: "center",
	},
});

export default ChangePassword;
