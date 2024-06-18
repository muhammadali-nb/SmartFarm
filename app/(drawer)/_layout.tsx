import { Drawer } from "expo-router/drawer";
import SideMenu from "src/components/global/side-menu";

const DrawerLayout = () => {
	return (
		<Drawer drawerContent={() => <SideMenu />}>
			<Drawer.Screen
				name="farm" // This is the name of the page and must match the url from root
				options={{
					headerShown: false,
				}}
			/>
			<Drawer.Screen name="test" />
			<Drawer.Screen name="demo" />
		</Drawer>
	);
};

export default DrawerLayout;
