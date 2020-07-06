import React, {ReactElement, RefObject, useEffect, useState} from 'react';
import StyledEdgeLine from './StyledEdgeLine';
import Position from '../../models/Position';
import StyledEdgeContainer from './StyledEdgeContainer';
import StyledPolygon from './StyledPolygon';

interface EdgeProps {
  n1: RefObject<HTMLSpanElement>;
  n2: RefObject<HTMLSpanElement>;
  isDirected: boolean;
  isVisited: boolean;
  zoomPercentage: number;
}

const Edge: React.FC<EdgeProps> = (props: EdgeProps): ReactElement => {
  const [position1, setPosition1] = useState<Position | null>(null);
  const [position2, setPosition2] = useState<Position | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [makrerId, _setMarkerId] = useState<string>(
    new Date().getMilliseconds() + Math.floor(Math.random() * 1000).toString()
  );

  useEffect(() => {
    if (props.n1.current && props.n1.current.parentElement) {
      const initialTop: number = +props.n1.current.parentElement.style.top.replace(
        'px',
        ''
      );
      const initialLeft: number = +props.n1.current.parentElement.style.left.replace(
        'px',
        ''
      );
      const nodeRadius: number = props.n1.current.parentElement.offsetWidth / 2;
      const initialPosition1: Position = {
        top: initialTop + nodeRadius,
        left: initialLeft + nodeRadius,
      };
      const handler = (e: CustomEventInit<Position>) => {
        if (e?.detail) {
          const newPosition1: Position = e.detail;
          setPosition1(newPosition1);
        }
      };
      props.n1.current.addEventListener('position', handler);
      if (!position1) {
        setPosition1(initialPosition1);
      }
      return () => props.n1.current?.removeEventListener('position', handler);
    }
  }, [props.n1, position1]);

  useEffect(() => {
    if (props.n2.current && props.n2.current.parentElement) {
      const initialTop: number = +props.n2.current.parentElement.style.top.replace(
        'px',
        ''
      );
      const initialLeft: number = +props.n2.current.parentElement.style.left.replace(
        'px',
        ''
      );
      const nodeRadius: number = props.n2.current.parentElement.offsetWidth / 2;
      const initialPosition1: Position = {
        top: initialTop + nodeRadius,
        left: initialLeft + nodeRadius,
      };
      const handler = (e: CustomEventInit<Position>) => {
        if (e?.detail) {
          const newPosition2: Position = e.detail;
          setPosition2(newPosition2);
        }
      };
      props.n2.current.addEventListener('position', handler);
      if (!position2) {
        setPosition2(initialPosition1);
      }
      return () => props.n2.current?.removeEventListener('position', handler);
    }
  }, [props.n2, position2]);

  const pos1Top = position1 ? position1.top : 0;
  const pos2Top = position2 ? position2.top : 0;
  const pos1Left = position1 ? position1.left : 0;
  const pos2Left = position2 ? position2.left : 0;
  const arrowWidth = 10 * props.zoomPercentage;
  const arrowHeight = 7 * props.zoomPercentage;

  return (
    <StyledEdgeContainer
      height={Math.max(pos1Top, pos2Top) + arrowHeight * 2}
      width={Math.max(pos1Left, pos2Left) + arrowWidth * 2}
    >
      <defs>
        <marker
          orient="auto"
          id={makrerId}
          markerWidth={arrowWidth}
          markerHeight={arrowHeight}
          refX={5}
          refY={arrowHeight / 2}
        >
          <StyledPolygon
            points={`0 0, ${arrowWidth} ${arrowHeight / 2}, 0 ${arrowHeight}`}
            isVisited={props.isVisited}
          />
        </marker>
      </defs>
      <StyledEdgeLine
        points={`${pos1Left},${pos1Top},${(pos1Left + pos2Left) / 2},${
          (pos1Top + pos2Top) / 2
        },${pos2Left},${pos2Top}`}
        isVisited={props.isVisited}
        markerMid={props.isDirected ? `url(#${makrerId})` : 'none'}
      />
    </StyledEdgeContainer>
  );
};

export default Edge;
