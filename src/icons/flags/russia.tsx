import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Russia(props) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={32}
			height={32}
			viewBox="0 0 32 32"
			{...props}>
			<Path fill="#1435a1" d="M1 11h30v10H1z" />
			<Path
				d="M5 4h22c2.208 0 4 1.792 4 4v4H1V8c0-2.208 1.792-4 4-4z"
				fill="#fff"
			/>
			<Path
				d="M27 28H5c-2.208 0-4-1.792-4-4v-4h30v4c0 2.208-1.792 4-4 4z"
				fill="#c53a28"
			/>
			<Path
				d="M27 4H5a4 4 0 00-4 4v16a4 4 0 004 4h22a4 4 0 004-4V8a4 4 0 00-4-4zm3 20c0 1.654-1.346 3-3 3H5c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3h22c1.654 0 3 1.346 3 3v16z"
				opacity={0.15}
			/>
			<Path
				d="M27 5H5a3 3 0 00-3 3v1a3 3 0 013-3h22a3 3 0 013 3V8a3 3 0 00-3-3z"
				fill="#fff"
				opacity={0.2}
			/>
		</Svg>
	);
}

export default Russia;
