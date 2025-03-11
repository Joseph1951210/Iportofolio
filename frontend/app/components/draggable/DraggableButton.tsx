"use client"
import React from 'react';
import Draggable from 'react-draggable';
import { draggableProps } from '../interface/Draggable.d';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { DraggableContext } from '@/app/context/DraggableProvider';

const DraggableButton: React.FC<draggableProps> = ({
  id,
  x,
  y,
  link,
  color,
  variant,
  size,
  value,
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
  const ButtonEle = <Button
    className={`absolute left-0 top-0 ${focused ? 'border-dashed border-2 border-blue-500' : ''}`}
    color={color}
    variant={variant}
    size={size}
    onClick={() => {
      setFocusedElementId(id);
      if (!editing && link) {
        window.location.href = link;
      }
    }
    }
  >{value || 'button'}</Button>;
  if (!editing) {
    return <div
      style={{ display: 'inline-block', position: 'absolute', transform: `translate(${x}px, ${y}px)` }}>
      {ButtonEle}</div>
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
      {ButtonEle}
    </Draggable>
  );
};

export default DraggableButton;
