import React, {ReactElement, useState} from 'react';
import ContextTile from '../common/ContextMenu/ContextTile';
import Arrow from '../common/ContextMenu/Arrow';
import SubMenu from '../common/ContextMenu/SubMenu/SubMenu';

interface Props {
  neighbours: Array<number>;
  onEdgeDelete: Function;
}

const DeleteEdgeTile: React.FC<Props> = (props: Props): ReactElement => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <ContextTile
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>Delete edge</div>
      <Arrow></Arrow>
      {isHovered && props.neighbours.length !== 0 ? (
        <SubMenu>
          {props.neighbours.map((val: number) => (
            <ContextTile onClick={() => props.onEdgeDelete(val)}>
              {val + 1}
            </ContextTile>
          ))}
        </SubMenu>
      ) : null}
    </ContextTile>
  );
};

export default DeleteEdgeTile;
