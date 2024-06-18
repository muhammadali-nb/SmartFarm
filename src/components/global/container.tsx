import { View, Text } from "react-native";
import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
	return (
		<View
			style={{
				paddingHorizontal: 14,
			}}>
			{children}
		</View>
	);
};

export default Container;
