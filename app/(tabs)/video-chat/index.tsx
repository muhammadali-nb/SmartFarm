import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import {
	RTCPeerConnection,
	RTCView,
	mediaDevices,
	MediaStream,
	MediaStreamTrack,
} from "react-native-webrtc";

const LocalVideo: React.FC = () => {
	const [localStream, setLocalStream] = useState<MediaStream | null>(null);
	const localVideoRef = useRef(null);

	useEffect(() => {
		// Function to start capturing the video stream
		const startCapture = async () => {
			try {
				const stream = await mediaDevices.getUserMedia({
					audio: true,
					video: true,
				});
				setLocalStream(stream);
			} catch (error) {
				console.error("Error getting user media:", error);
			}
		};

		startCapture();

		return () => {
			if (localStream) {
				localStream
					.getTracks()
					.forEach((track: MediaStreamTrack) => track.stop());
			}
		};
	}, []);

	return (
		<View style={styles.container}>
			{localStream ? (
				<RTCView
					ref={localVideoRef}
					streamURL={localStream.toURL()}
					style={styles.video}
					objectFit="cover"
					mirror={true}
				/>
			) : (
				<Text>No local stream</Text>
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
		height: "100%",
	},
});

export default LocalVideo;
