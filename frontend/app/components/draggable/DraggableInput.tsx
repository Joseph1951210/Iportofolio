"use client"
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { TextField } from '@mui/material';
import { draggableProps } from '../interface/draggable.d';
import { DraggableContext } from '@/app/context/DraggableProvider';
import { useContext } from 'react';
const DraggableInput: React.FC<draggableProps> = ({
  id,
  x,
  y,
  style,
  value,
  setValue,
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
  const [currentValue, setCurrentValue] = useState<string>(value || '');
  const TextFieldEle = <TextField
    className={`absolute left-0 top-0 ${focused ? 'border-dashed border-2 border-blue-500' : ''}`}
    value={currentValue}
    multiline
    placeholder="Input some text"
    onClick={() => {setFocusedElementId?.(id)}}
    onChange={(e) => {
    // If it is displaying but not editing, make it read only
      if (!editing) return;

      const v = e.target.value;
      setValue?.(v, id);
      setCurrentValue?.(v);
    }}
    onFocus={(e) => {
    // If it is displaying but not editing, make it read only
      if (!editing) {
        e.target.blur();
      }
    }}
    slotProps={{ htmlInput: { style: style } }}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          border: 'none', // Removes the outer border
        } },
    }}
  />
  if (!editing) {
    return <div
      style={{ display: 'inline-block', position: 'absolute', transform: `translate(${x}px, ${y}px)` }}>
      {TextFieldEle}</div>
  }
  return (
    <Draggable
      axis="both" // Restrict dragging to both axes (default)
      bounds="parent" // Prevent dragging outside of parent container
      position={{ x: x || 0, y: y || 0 }}
      // grid={[25, 25]} // Snap to 25px increments
      onStop={(event, data) => {
        handlePositionChange?.(data.lastX, data.lastY, id)
      }}
    >
      {TextFieldEle}
    </Draggable>
  );
};

export default DraggableInput;
