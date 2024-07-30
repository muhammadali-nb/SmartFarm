import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-get-random-values";
import Container from "src/components/global/container";
import socket from "src/socket";
import ACTIONS from "src/socket/actions";
import { v4 } from "uuid";

export default function App() {
	const [rooms, updateRooms] = useState([]);
	const rootNode = useRef(null);

	useEffect(() => {
		socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
			if (rootNode.current) {
				updateRooms(rooms);
			}
		});
	}, [rootNode.current]);

	return (
		<View ref={rootNode} style={styles.container}>
			<Container>
				<View>
					<Text>Rooms:</Text>
					<View>
						{rooms.map((room) => (
							<Link key={room} href={`/video-chat/${room}`}>
								<Text>{room}</Text>
							</Link>
						))}
					</View>
				</View>
				<Link href={`/room/${v4()}`} asChild>
					<Text
						style={{
							backgroundColor: "gray",
							textAlign: "center",
							paddingVertical: 10,
							color: "white",
							fontWeight: 600,
							fontSize: 16,
						}}>
						Create Room
					</Text>
				</Link>
			</Container>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	video: {
		width: "100%",
		height: "100%",
		backgroundColor: "black",
	},
});
