import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';
import './svg-pattern.scss';

export interface SvgTextPatternProps {
  text: string;
  name?: string;
  repeat?: number;
  saturation?: string,
  lightness?: string;
  opacity?: number;
}

export const SvgTextPattern = ({
  text,
  repeat = 9,
  saturation = '100%',
  lightness = '75%',
  opacity = 0.25,
  name = 'txt-pattern'
}: SvgTextPatternProps) => {
  const assignedColor = getHslColorFromCharCode(text, saturation, lightness, opacity);

  return text ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="svg-pattern-repeat-text">
      <defs>
        <pattern id={`${name}-${text}`} x="0" y="0" width="1" height="0.31rem">
          <text x="0" y="2rem" className="svg-pattern-watermark" fill={assignedColor}>
            {new Array(repeat).fill(text).join(' ')}
          </text>
          <text x="1.5rem" y="4.4rem" className="svg-pattern-watermark" fill={assignedColor}>
            {new Array(repeat).fill(text).join(' ')}
          </text>
        </pattern>
      </defs>
      
      <rect fill={`url(#${name}-${text})`} width="100%" height="100%"/>
    </svg>
  ) : null;
};
