import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useMemo } from "react";
import { Pressable } from "react-native";
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
} from "react-native-reanimated";

const CustomBackdrop = ({
	animatedIndex,
	style,
	onPress,
}: BottomSheetDefaultBackdropProps) => {
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			animatedIndex.value,
			[-1, 0],
			[0, 1],
			Extrapolate.CLAMP
		),
	}));

	// styles
	const containerStyle = useMemo(
		() => [
			style,
			{
				backgroundColor: "rgba(0,0,0,.65)",
			},
			containerAnimatedStyle,
		],
		[style, containerAnimatedStyle]
	);

	return (
		<Pressable
			onPress={onPress}
			style={{ height: "100%", position: "absolute", width: "100%" }}>
			<Animated.View style={containerStyle} />
		</Pressable>
	);
};

export default CustomBackdrop;
