import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BottomSheetProvider = ({ children }: PropsWithChildren) => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>{children}</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};

export default BottomSheetProvider;
