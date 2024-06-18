import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Uzbekistan(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      {...props}
    >
      <Path fill="#fff" d="M1 11h30v10H1z" />
      <Path
        d="M5 4h22c2.208 0 4 1.792 4 4v4H1V8c0-2.208 1.792-4 4-4z"
        fill="#4498b3"
      />
      <Path
        d="M27 28H5c-2.208 0-4-1.792-4-4v-4h30v4c0 2.208-1.792 4-4 4z"
        fill="#55b44b"
      />
      <Path fill="#be2a2c" d="M1 12h30v1H1zM1 19h30v1H1z" />
      <Path
        d="M27 4H5a4 4 0 00-4 4v16a4 4 0 004 4h22a4 4 0 004-4V8a4 4 0 00-4-4zm3 20c0 1.654-1.346 3-3 3H5c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3h22c1.654 0 3 1.346 3 3v16z"
        opacity={0.15}
      />
      <Path
        d="M27 5H5a3 3 0 00-3 3v1a3 3 0 013-3h22a3 3 0 013 3V8a3 3 0 00-3-3z"
        fill="#fff"
        opacity={0.2}
      />
      <Path
        d="M7.417 6.51a2.338 2.338 0 100 4.61 2.338 2.338 0 010-4.61zM9.741 10.181l-.177-.546-.177.546h-.574l.464.337-.177.545.464-.337.464.337-.177-.545.464-.337h-.574zM12.899 10.181l-.177-.546-.178.546h-.573l.464.337-.177.545.464-.337.464.337-.177-.545.464-.337h-.574zM12.722 6.477l-.178.546h-.573l.464.337-.177.545.464-.337.464.337-.177-.545.464-.337h-.574l-.177-.546z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Uzbekistan