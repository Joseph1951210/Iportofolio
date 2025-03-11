import React, { useEffect, useState } from "react"
import { Input, InputAdornment, List, ListItem, ListItemText, Switch, TextField } from "@mui/material";
import Divider from '@mui/material/Divider';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { InfoProps } from "../interface/Info";
import { TwitterPicker } from "react-color";
type horizontalDirectionType = "left" | "center" | "right";

const InputInfo: React.FC<InfoProps> = ({ id, currentPage, setCurrentPage }) => {
  const eleType = currentPage?.find?.((ele: any) => {
    return ele?.id == id})?.type || '';
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [width, setWidth] = useState<number>(188);
  const [height, setHeight] = useState<number>(56);
  const [fontSize, setFontSize] = useState<number>(16);
  const [color, setColor] = useState<string>('black');
  const [fontWeight, setFontWeight] = useState<number>(0);
  const [underline, setUnderline] = useState<boolean>(false);
  const [fontHorizontalDirection, setFontHorizontalDirection] = useState<horizontalDirectionType>("left");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const handleUpdateData = () => {
    currentPage?.forEach?.((ele: any) => {
      if (ele?.id == id) {
        ele.x = x;
        ele.y = y;
        ele.style = {
          width: `${width}px`,
          height: `${height}px`,
          fontSize: `${fontSize}px`,
          color: color,
          fontWeight: fontWeight,
          textDecoration: underline ? "underline" : "none",
          textAlign: fontHorizontalDirection,
        }
      }
    });
    // Deep copy
    setCurrentPage([...currentPage]);
  }

  // If click outside, close color picker
  const handleClickOutside = () => {
    setShowColorPicker(false);
  };

  useEffect(() => {
    currentPage?.forEach?.((ele: any) => {
      if (ele?.id == id) {
        setX(ele?.x || 0);
        setY(ele?.y || 0);
        setWidth(parseFloat(ele?.style?.width) || 188);
        setHeight(parseFloat(ele?.style?.height) || 56);
        setFontSize(parseFloat(ele?.style?.fontSize) || 16);
        setColor(ele?.style?.color || 'black');
        setFontWeight(ele?.style?.fontWeight || 0);
        setUnderline(ele?.style?.underline || false);
        setFontHorizontalDirection(ele?.style?.fontHorizontalDirection || 'left');
      }})
  }, [id]);

  useEffect(() => {
    currentPage?.forEach?.((ele: any) => {
      if (ele?.id == id) {
        setX(ele?.x || 0);
        setY(ele?.y || 0);
      }})
  }, [currentPage]);

  useEffect(() => {
    // Set color picker close
    document.body.addEventListener('click', () => handleClickOutside());

    return () => {
      document.body.removeEventListener('click', () => handleClickOutside());
    }
  }, [])

  useEffect(() => {
    // Prevent from first mount of state change the real data with state's initial data
    if (mounted) {
      handleUpdateData();
    } else {
      setMounted(true);
    }
  }, [underline, fontHorizontalDirection, color])

  return (
    <List sx={{ height: "100%" }}>
      <Divider />
      <ListItem>
        <span className="pl-[5%] mt-6 text-sm font-bold">Position</span>
      </ListItem>
      <ListItem>
        <div className="flex">
          <TextField
            className="mr-[20%]"
            size='small'
            variant="standard"
            label='X'
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              },
            }}
            value={x}
            onChange={(event) => {setX?.(parseInt(event.target.value) || 0)}}
            onBlur={handleUpdateData}
          />
          <TextField
            size='small'
            variant="standard"
            label='Y'
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              },
            }}
            value={y}
            onChange={(event) => {setY?.(parseInt(event.target.value) || 0)}}
            onBlur={handleUpdateData}
          />
        </div>
      </ListItem>
      <Divider className="mt-10" />
      <ListItem>
        <span className="pl-[5%] mt-6 text-sm font-bold">Layout</span>
      </ListItem>
      <ListItem>
        <div className="flex">
          <TextField
            className="mr-[20%]"
            size='small'
            variant="standard"
            label='Width'
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              },
            }}
            value={width}
            onChange={(event) => {setWidth?.(parseInt(event.target.value) || 0)}}
            onBlur={handleUpdateData}
          />
          <TextField
            size='small'
            variant="standard"
            label='Height'
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              },
            }}
            value={height}
            onChange={(event) => {setHeight?.(parseInt(event.target.value) || 0)}}
            onBlur={handleUpdateData}
          />
        </div>
      </ListItem>
      <Divider className="mt-10" />
      <ListItem >
        <span className="pl-[5%] mt-6 text-sm font-bold">Typography</span>
      </ListItem>
      <ListItem className="flex justify-center">
        <div
          className="mr-[20%]"
          onClick={(event) => {
            setShowColorPicker?.(true);
            event.stopPropagation();
          }}
        >
          <TextField
            size='small'
            variant="standard"
            label='Font Color'
            value={color}
          />
          <div
            className="h-4 w-4 absolute left-[35%] bottom-4"
            style={{ backgroundColor: `${color || '#ffffff'}` }}>
          </div>
          <div className={`${showColorPicker ? "block" : "hidden"} absolute mt-4 z-10`}>
            <TwitterPicker
              colors={['#FFFFFF', '#000000', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
              width='150px'
              color={color}
              onChange={(color) => {
                setColor?.(color.hex || '#ffffff')
              }}
            />
          </div>
        </div>
        <TextField
          size='small'
          variant="standard"
          label='Font Size'
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">px</InputAdornment>,
            },
          }}
          value={fontSize}
          onChange={(event) => {setFontSize?.(parseInt(event.target.value) || 0)}}
          onBlur={handleUpdateData}
        />
      </ListItem>
      <ListItem className="flex">
        <TextField
          className="mr-[60%]"
          size='small'
          variant="standard"
          label='Font Weight'
          value={fontWeight}
          onChange={(event) => {setFontWeight?.(parseInt(event.target.value) || 0)}}
          onBlur={handleUpdateData}
        />
      </ListItem>
      <ListItem className="flex justify-between">
        <div className="flex flex-col justify-between h-14">
          <div style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '12px' }}>Underline</div>
          <Switch
            value={underline}
            onChange={(event) => {
              setUnderline?.(event.target.checked);
            }}
          />
        </div>

        <div className="flex flex-col justify-between items-center h-14">
          <div style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '12px' }}>Horizontal Direction</div>
          <div className="flex">
            <FormatAlignLeftIcon
              className={`${fontHorizontalDirection == 'left' ? "bg-slate-300" : "bg-white"}`}
              onClick={() => setFontHorizontalDirection("left")}/>
            <FormatAlignCenterIcon
              className={`${fontHorizontalDirection == 'center' ? "bg-slate-300" : "bg-white"}`}
              onClick={() => setFontHorizontalDirection("center")}/>
            <FormatAlignRightIcon
              className={`${fontHorizontalDirection == 'right' ? "bg-slate-300" : "bg-white"}`}
              onClick={() => setFontHorizontalDirection("right")}/>
          </div>
        </div>
      </ListItem>
    </List>
  )
}

export default InputInfo