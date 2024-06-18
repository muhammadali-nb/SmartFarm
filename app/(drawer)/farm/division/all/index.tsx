import { useLocalSearchParams } from "expo-router";

import { FlatList, StyleSheet } from "react-native";
import FarmListCard from "src/components/pages/farm/farm-list-card";

import { ScrollView } from "react-native-virtualized-view";
import Container from "src/components/global/container";
import FarmUnderPageHeader from "src/components/layout/farm/farm-under-page-header";
import { FarmListData } from "src/components/pages/farm/farm-list";
import { formatData } from "src/utils/format-grid";

const numColumns = 3;

const FarmIdentifyAnimalsAll = () => {
	const { farmID, division } = useLocalSearchParams();
	const getData = () => {
		const data = FarmListData.find((_item) => _item.id == Number(division));
		return data;
	};

	return (
		<>
			<FarmUnderPageHeader title={getData().title} />
			<ScrollView style={{ paddingVertical: 20 }}>
				<Container>
					<FlatList
						data={formatData(getData().list, numColumns)}
						numColumns={numColumns}
						style={{ paddingBottom: 14, gap: 8 }}
						columnWrapperStyle={{ gap: 8 }}
						renderItem={({ item }) => (
							<FarmListCard
								key={item.id}
								icon={item.icon}
								name={item.name}
								style={item.empty === true && styles.itemInvisible}
							/>
						)}
					/>
				</Container>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	farmIdentifyAnimalsAll: {
		paddingVertical: 20,
	},
	itemInvisible: {
		backgroundColor: "transparent",
	},
});

export default FarmIdentifyAnimalsAll;
