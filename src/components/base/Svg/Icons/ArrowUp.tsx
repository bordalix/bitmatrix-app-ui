import React from 'react';
import Svg from '../Svg';
import { IconSvg } from './IconSvg';

const ArrowUpIcon: React.FC<IconSvg> = ({ fill = '#00FF00', bgColor, width = '0.85rem', height = '0.85rem' }) => (
  <Svg
    fill={fill}
    bgColor={bgColor}
    width={width}
    height={height}
    path="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
    viewBox="0 0 448 512"
  />
);

export default ArrowUpIcon;
