import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function User(props) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<G
				fillRule="evenodd"
				clipRule="evenodd"
				stroke="#747578"
				strokeLinecap="round"
				strokeLinejoin="round">
				<Path
					d="M11.985 15.346c-3.868 0-7.17.585-7.17 2.927s3.281 2.948 7.17 2.948c3.867 0 7.17-.586 7.17-2.927s-3.282-2.948-7.17-2.948z"
					strokeWidth={1.8}
				/>
				<Path
					d="M11.985 12.006A4.596 4.596 0 107.389 7.41a4.58 4.58 0 004.563 4.596h.033z"
					strokeWidth={1.8}
				/>
			</G>
		</Svg>
	);
}

export default User;
