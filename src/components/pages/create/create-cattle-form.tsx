import { View, Button, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { Formik } from "formik";
import Input from "src/components/global/input";
import Container from "src/components/global/container";
import * as Yup from "yup";

const CreateTripSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, "To short!")
		.max(50, "To long!")
		.required("Please enter your email."),
	id: Yup.number()
		.min(3, "To short!")
		.max(123456, "To long!")
		.typeError("Field must be a number")
		.required("Please enter your number."),
});

const CreateCattleForm = () => {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const handleStartDateChange = (date) => {
		setStartDate(date);
	};

	const handleEndDateChange = (date) => {
		setEndDate(date);
	};

	return (
		<View style={style.createCattleForm}>
			<Container>
				<View style={style.createCattleFormContainer}>
					<Formik
						validationSchema={CreateTripSchema}
						initialValues={{
							name: "",
							id: "",
						}}
						onSubmit={(values) => console.log(values)}>
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
									placeholder="Name"
									isError={errors.name && touched.name ? errors.name : null}
								/>
								<Input
									onChangeText={handleChange("id")}
									onBlur={handleBlur("id")}
									value={values.id}
									placeholder="Id"
									keyboardType="numeric"
									isError={errors.id && touched.id ? errors.id : null}
								/>

								{/* <DateRangePicker /> */}
								<Button onPress={() => handleSubmit()} title="Submit" />
							</View>
						)}
					</Formik>
				</View>
			</Container>
		</View>
	);
};

const style = StyleSheet.create({
	createCattleForm: {
		paddingTop: 20,
	},
	createCattleFormContainer: {
		backgroundColor: "#fff",
		paddingHorizontal: 14,
		paddingVertical: 20,
		borderRadius: 12,
	},
});

export default CreateCattleForm;
