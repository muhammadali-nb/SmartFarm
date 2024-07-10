import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { RTCView } from "react-native-webrtc";
import useWebRTC from "src/hooks/use-webrtc";

const Room = () => {
	const { id: roomID } = useLocalSearchParams<{ id: string }>();

	const { clients, provideMediaRef, peerMediaElements } = useWebRTC(roomID);

	console.log("clients", clients);

	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
				}}>
				{clients.map((clientID) => (
					<RTCView
						key={clientID}
						style={{
							width: "50%",
							height: "50%",
							backgroundColor: "red",
						}}
						zOrder={1}
						ref={(node) => provideMediaRef(clientID, node)}
						streamURL={peerMediaElements.current[clientID]?.srcObject?.toURL()}
					/>
				))}
			</View>
			<Text>Connected Clients: {clients.length}</Text>
		</View>
	);
};

export default Room;
