import { Entypo } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
	Dimensions,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { tokens } from "src/localization/tokens";
import FarmListCard from "./farm-list-card";

import { Link, useLocalSearchParams } from "expo-router";
import { formatData } from "src/utils/format-grid";

const numColumns = 3;
export const FarmListData = [
	{
		id: 1,
		title: "Идентификация",
		list: [
			{
				id: 1,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Ҳайвонлар рўйхати",
			},
			{
				id: 2,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Ҳайвонларни идентификация қилиш",
			},
			{
				id: 3,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Вафот этган ҳайвонлар",
			},
			{
				id: 4,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Йўқотилган ҳайвонлар",
			},
			{
				id: 5,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Янги сотиб олинган ҳайвонлар",
			},
			{
				id: 6,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Ҳабар юбориш",
			},
			{
				id: 7,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Давлат ветеринария инспекторларини чақириш",
			},
		],
	},
	{
		id: 2,
		title: "Эмлаш",
		list: [
			{
				id: 1,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Ҳудудда мавжуд эмламалар",
			},
			{
				id: 2,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Эмланган ҳайвонлар",
			},
			{
				id: 3,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Эмламалар билан танишиш",
			},
			{
				id: 4,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Давлат ветеринария инспекторларини чақириш",
			},
		],
	},
	{
		id: 3,
		title: "Озиқлантириш",
		list: [
			{
				id: 1,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Озуқа рационига буюртма бериш",
			},
			{
				id: 2,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Озуқа рационини хисоблаш",
			},
			{
				id: 3,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Тайер озуқа рационлари рўйхати",
			},
			{
				id: 4,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Махсулотлар рўйхати",
			},
		],
	},
	{
		id: 4,
		title: "Урчитиш",
		list: [
			{
				id: 1,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Урчитилган ҳайвонлар",
			},
			{
				id: 2,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Суний уруғ етказиб берувчилар",
			},
		],
	},
	{
		id: 5,
		title: "Махсулдорлик",
		list: [
			{
				id: 1,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Сут йўналишида",
			},
			{
				id: 2,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Гўшт йўналишида",
			},
		],
	},
	{
		id: 6,
		title: "Ветеринария дорихоналари",
		list: [
			{
				id: 1,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Ветеринария дорихоналари рўйхати",
			},
			{
				id: 2,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Вет припаратлар рўйхати",
			},
		],
	},
	{
		id: 7,
		title: "Қўшимча хизматлар",
		list: [
			{
				id: 1,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Ветеринар маслахати",
			},
			{
				id: 2,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Банитировка",
			},
			{
				id: 3,
				icon: <Entypo name="list" size={34} color="#fff" />,
				name: "Наслчилик мақомини олиш",
			},
		],
	},
];

const FarmList = () => {
	const { t } = useTranslation();
	const { width } = Dimensions.get("window");
	const { id } = useLocalSearchParams();
	return (
		<View style={styles.farmList}>
			{FarmListData.map((_item) => (
				<View key={_item.id}>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							marginBottom: 18,
						}}>
						<Text
							style={[
								styles.farmListTitle,
								{
									maxWidth: width > 400 ? "auto" : 200,
								},
							]}>
							{_item.title}
						</Text>

						<Link
							href={{
								pathname: "/farm/division/all",
								params: { farmID: id, division: _item.id },
							}}
							asChild>
							<Pressable
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}>
								<>
									<Text style={{ color: "#6236ff", fontWeight: "500" }}>
										{t(tokens.common.all)}
									</Text>
									<Entypo
										name="chevron-small-right"
										size={22}
										color="#6236ff"
									/>
								</>
							</Pressable>
						</Link>
					</View>
					<FlatList
						data={formatData(_item.list.slice(0, 3), numColumns)}
						numColumns={numColumns}
						style={{ paddingBottom: 14, gap: 8 }}
						columnWrapperStyle={{ gap: 8 }}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<FarmListCard
								key={item.id}
								icon={item.icon}
								name={item.name}
								style={item.empty === true && styles.itemInvisible}
							/>
						)}
					/>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	farmList: {
		paddingVertical: 20,
		height: "auto",
	},
	farmListTitle: {
		fontSize: 20,
		fontWeight: "500",
	},
	itemInvisible: {
		backgroundColor: "transparent",
	},
});

export default FarmList;
