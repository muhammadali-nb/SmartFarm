// DateRangePicker.js

import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

const DateRangePicker = () => {
	const [focus, setFocus] = useState("startDate");
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const onDatesChange = ({ startDate, endDate, focusedInput }) => {
		setStartDate(startDate);
		setEndDate(endDate);
		setFocus(focusedInput || "startDate");
	};

	return (
		<View style={styles.container}>
			<Text>Start Date:</Text>
			{/* <DateRange
				startDate={startDate}
				endDate={endDate}
				focusedInput={focus}
				onDatesChange={onDatesChange}
			/> */}

			{/* You can display the selected date range if needed */}
			{startDate && endDate && (
				<Text>
					Selected Date Range: {startDate.format("YYYY-MM-DD")} -{" "}
					{endDate.format("YYYY-MM-DD")}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
});

export default DateRangePicker;
