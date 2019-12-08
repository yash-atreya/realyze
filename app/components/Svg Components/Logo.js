import React from 'react';
import Svg, {Path, G} from 'react-native-svg';
const Logo = props => (
  <Svg width={212.2} height={300.516}>
    <G
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={60}>
      <Path d="M42.37 42.369l127.46 114.925L42.37 258.369" stroke="#00a1ed" />
      <Path d="M169.83 42.369L42.37 157.295 169.83 258.37" stroke="#fe0" />
    </G>
  </Svg>
);

export default Logo;
