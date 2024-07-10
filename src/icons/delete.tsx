import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";

function Delete(props) {
	return (
		<Svg
			width={20}
			height={16}
			viewBox="0 0 22 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<Path
				d="M7.92 1a2 2 0 00-1.519.698l-4.285 5a2 2 0 000 2.604l4.285 5A2 2 0 007.92 15H19a2 2 0 002-2V3a2 2 0 00-2-2H7.92zM15 6l-4 4M11 6l4 4"
				stroke="#292929"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

export default Delete;
