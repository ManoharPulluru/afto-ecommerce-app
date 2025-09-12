import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import svgPaths from './svg.json';

export type IconName = keyof typeof svgPaths;

interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  width = 36, // Increased default size
  height = 36, // Increased default size
  color = '#000',
}) => {
  const path = svgPaths[name];

  if (!path) {
    console.warn(`Icon "${name}" not found in svg.json`);
    return <View style={{ width, height }} />; // Placeholder to maintain layout
  }

  return (
    <View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path d={path} fill={color} />
      </Svg>
    </View>
  );
};

export default Icon;