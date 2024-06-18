import { Link } from "expo-router";

import { Pressable, StyleSheet, View } from "react-native";

import AnimalCard from "./animal-card";

const AnimalList = () => {
	return (
		<View style={styles.animalList}>
			{Array.from({ length: 2 }, (_, index) => (
				<Link key={index} href={`/farm/${index + 1}`} asChild>
					<Pressable>
						<AnimalCard />
					</Pressable>
				</Link>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	animalList: {
		paddingVertical: 20,
		gap: 14,
	},
});

export default AnimalList;
