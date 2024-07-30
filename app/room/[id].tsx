import React from "react";
import { View, StyleSheet } from "react-native";
import { RTCView } from "react-native-webrtc";
import useWebRTC, { LOCAL_VIDEO } from "../../src/hooks/use-webrtc";

const Room: React.FC<{ roomID: string }> = ({ roomID }) => {
	const { clients, streams } = useWebRTC(roomID);

	return (
		<View style={styles.container}>
			{clients.map((clientID) => (
				<RTCView
					key={clientID}
					streamURL={streams[clientID]}
					style={styles.video}
					objectFit="cover"
				/>
			))}
			{streams[LOCAL_VIDEO] && (
				<RTCView
					key={LOCAL_VIDEO}
					streamURL={streams[LOCAL_VIDEO]}
					style={styles.video}
					objectFit="cover"
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	video: {
		width: "100%",
		height: "50%",
	},
});

export default Room;
