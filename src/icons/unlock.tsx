import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function Unlock(props) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<G
				stroke="#747578"
				strokeWidth={1.8}
				strokeLinecap="round"
				strokeLinejoin="round">
				<Path d="M16.424 5.562A4.554 4.554 0 0012.122 2.5a4.551 4.551 0 00-4.57 4.531v2.167" />
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M15.933 21H8.292A3.793 3.793 0 014.5 17.209V12.92a3.793 3.793 0 013.792-3.793h7.641a3.793 3.793 0 013.792 3.793v4.288A3.793 3.793 0 0115.933 21z"
				/>
				<Path d="M12.113 13.953v2.222" />
			</G>
		</Svg>
	);
}

export default Unlock;
