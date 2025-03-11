"use client"
import Draggable from 'react-draggable';
import { draggableProps } from '../interface/Draggable.d';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import { useContext } from 'react';
import { DraggableContext } from '@/app/context/DraggableProvider';

const DraggableIcon: React.FC<draggableProps> = ({
  id,
  x,
  y,
  link,
  value,
  color,
  size,
  setFocusedElementId,
  handlePositionChange,
}) => {
  let editing = false;
  let _currentFocusedElementId = null;
  try {
    editing = useContext(DraggableContext);
    const { currentFocusedElementId } = useContext(DraggableContext);
    _currentFocusedElementId = currentFocusedElementId;
  } catch {
    console.log('read only');
  }
  const focused: boolean = editing && _currentFocusedElementId == id;
  const valueToIconMap = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    linkedin: LinkedInIcon,
    gitHub: GitHubIcon,
    x: XIcon
  }

  const IconElement = valueToIconMap?.[value] || FacebookIcon;
  const IconEle = <IconElement
    className={`absolute left-0 top-0 ${focused ? 'border-dashed border-2 border-blue-500' : ''}`}
    onClick={() => {
      setFocusedElementId(id);
      if (!editing && link) {
      // Open new tab
        window.open(link);
      }
    }}
    style={{ color: color || 'black', fontSize: size || '24px' }}
  />;
  if (!editing) {
    return <div
      style={{ display: 'inline-block', position: 'absolute', transform: `translate(${x}px, ${y}px)` }}>
      {IconEle}</div>
  }
  return (
    <Draggable
      axis="both" // Restrict dragging to both axes (default)
      bounds="parent" // Prevent dragging outside of parent container
      position={{ x: x || 0, y: y || 0 }}
      // grid={[25, 25]} // Snap to 25px increments
      onStop={(event, data) => {
        handlePositionChange(data.lastX, data.lastY, id)
      }}
    >
      {IconEle}
    </Draggable>
  );
};

export default DraggableIcon;
