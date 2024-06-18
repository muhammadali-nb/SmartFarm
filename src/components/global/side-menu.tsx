import { View, Text, StyleSheet } from "react-native";
import ProfileBlock from "./profile-block";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import SideMenuLink from "./side-menu-link";

const SideMenu = () => {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.sideMenu, { paddingTop: insets.top + 14 }]}>
			<ProfileBlock />
			<View style={styles.sideMenuLinks}>
				<Link href={"/home"} style={styles.sideMenuLink}>
					<SideMenuLink />
				</Link>
				<Link href={"/farm/1"} style={styles.sideMenuLink}>
					<SideMenuLink />
				</Link>
				<Link href={"/test"} style={styles.sideMenuLink}>
					<SideMenuLink />
				</Link>
				<Link href={"/demo"} style={styles.sideMenuLink}>
					<SideMenuLink />
				</Link>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	sideMenu: {
		width: "100%",
		height: "100%",
		backgroundColor: "#fff",
		position: "absolute",
		left: 0,
		top: 0,
		zIndex: 2,
		paddingHorizontal: 14,
	},
	sideMenuLinks: {
		marginTop: 60,
	},
	sideMenuLink: {
		paddingBottom: 18,
	},
	sideMenuLinkText: {
		color: "#fff",
		fontWeight: "500",
		fontSize: 16,
	},
});

export default SideMenu;
