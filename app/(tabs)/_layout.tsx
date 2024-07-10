import { FontAwesome5 } from "@expo/vector-icons";
import { PortalProvider } from "@gorhom/portal";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

import { Platform } from "react-native";
import { tokens } from "src/localization/tokens";

const TabsLayout = () => {
	const { t } = useTranslation();
	return (
		<PortalProvider>
			<Tabs
				screenOptions={{
					headerStyle: {
						backgroundColor: "#6236ff",
						height: 100,
					},
					headerTitleStyle: {
						color: "#fff",
						fontSize: 20,
						fontWeight: "600",
					},
					tabBarStyle: {
						height: Platform.OS === "ios" ? 86 : 64,
						paddingTop: 6,
					},
					tabBarItemStyle: {
						height: 50,
					},
					tabBarActiveTintColor: "#6236ff",
				}}>
				<Tabs.Screen
					name="home"
					options={{
						title: t(tokens.bottomTab.home),
						headerShown: false,
						tabBarIcon: ({ focused }) => {
							const color = focused ? "#6236ff" : "#948ba0";
							return <FontAwesome5 name="home" size={22} color={color} />;
						},
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: t(tokens.bottomTab.profile),
						headerShown: false,
						tabBarIcon: ({ focused }) => {
							const color = focused ? "#6236ff" : "#948ba0";
							return <FontAwesome5 name="user-alt" size={20} color={color} />;
						},
					}}
				/>
				<Tabs.Screen
					name="video-chat"
					options={{
						title: "Видео чат",
						headerShown: false,
						// tabBarIcon: ({ focused }) => {
						// 	const color = focused ? "#6236ff" : "#948ba0";
						// 	return <FontAwesome5 name="user-alt" size={20} color={color} />;
						// },
					}}
				/>
			</Tabs>
		</PortalProvider>
	);
};

export default TabsLayout;
