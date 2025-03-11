"use client"
import React, { useContext } from 'react';
import Draggable from 'react-draggable';
import { draggableProps } from '../interface/Draggable.d';
import { Box, ImageList, ImageListItem } from '@mui/material';
import { DraggableContext } from '@/app/context/DraggableProvider';

const DraggableMasonry: React.FC<draggableProps> = ({
  id,
  x,
  y,
  srcList,
  style,
  cols,
  gap,
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
  const BoxEle = <Box onClick={() => {
    setFocusedElementId(id);
  }}
  className={`absolute left-0 top-0 ${focused ? 'border-dashed border-2 border-blue-500' : ''}`}
  sx={{ width: 500, height: 450, overflowY: 'scroll', ...style }}>
    <ImageList variant="masonry" cols={cols || 3} gap={gap || 8}>
      {srcList?.map?.((src, index) => (
        <ImageListItem key={`${src}_${index}`}>
          <img
            src={src}
            alt=''
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  </Box>;
  if (!editing) {
    return <div
      style={{ display: 'inline-block', position: 'absolute', transform: `translate(${x}px, ${y}px)` }}>
      {BoxEle}</div>
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
      {BoxEle}
    </Draggable>
  );
};

export default DraggableMasonry;
