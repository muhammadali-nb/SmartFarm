import { Slot } from "expo-router";
import FarmHeader from "src/components/layout/farm/farm-header";
import Container from "src/components/global/container";
import { ScrollView } from "react-native-virtualized-view";

const FarmDetailLayout = () => {
	return (
		<>
			<FarmHeader />
			<ScrollView>
				<Container>
					<Slot />
				</Container>
			</ScrollView>
		</>
	);
};

export default FarmDetailLayout;
