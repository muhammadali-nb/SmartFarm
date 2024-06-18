import { ScrollView } from "react-native";
import { useEffect } from "react";
import { Slot, useNavigation } from "expo-router";
import HomeHeader from "src/components/layout/home/home-header";
import Container from "src/components/global/container";

const HomeLayout = () => {
	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = navigation.addListener("beforeRemove", (e) => {
			e.preventDefault(); // Отключить возврат назад
		});
		return unsubscribe;
	}, [navigation]);

	return (
		<>
			<HomeHeader />
			<ScrollView>
				<Container>
					<Slot />
				</Container>
			</ScrollView>
		</>
	);
};

export default HomeLayout;
