import { useRef, useCallback, useState } from "react";
import { Animated, Easing, Vibration } from "react-native";

export const useShakeAnimation = () => {
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const [isShaking, setIsShaking] = useState<"waiting" | "shaking" | "end">("waiting");

    const startShake = useCallback(() => {
        setIsShaking("shaking");
        Vibration.vibrate(100);
    }, []);

    const shake = useCallback(() => {
        startShake();
        Animated.sequence([
            Animated.timing(shakeAnim, {
                toValue: 10,
                duration: 50,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -10,
                duration: 50,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 10,
                duration: 50,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -10,
                duration: 50,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 0,
                duration: 50,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start(() => setIsShaking("end"));
    }, [shakeAnim, startShake]);

    return { shakeAnim, shake, isShaking };
}


