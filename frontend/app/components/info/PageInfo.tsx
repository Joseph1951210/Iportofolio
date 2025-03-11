import React, { useEffect, useState } from "react"
import { List, ListItem, InputAdornment, TextField } from "@mui/material";
import Divider from '@mui/material/Divider';
import { InfoProps } from "../interface/Info";
import { TwitterPicker } from 'react-color';

const PageInfo: React.FC<InfoProps> = ({
  currentPage,
  setCurrentPage

}) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [currentWidth, setCurrentWidth] = useState<number>(1000);
  const [currentHeight, setCurrentHeight] = useState<number>(2000);
  const [currentBackgroundColor, setCurrentBackgroudColor] = useState<string>('#ffffff');
  const [mounted, setMounted] = useState<boolean>(false);
  // If click outside, close color picker
  const handleClickOutside = () => {
    setShowColorPicker(false);
  };

  const handleUpdateData = () => {
    currentPage?.forEach?.((ele: any) => {
      if (ele?.type == 'page') {
        ele.style = {
          width: currentWidth,
          height: currentHeight,
          backgroundColor: currentBackgroundColor
        }
      }
    });
    // Deep copy
    setCurrentPage([...currentPage]);
  }

  useEffect(() => {
    // Set color picker close
    document.body.addEventListener('click', () => handleClickOutside());

    currentPage?.forEach?.((ele) => {
      if (ele?.type == 'page') {
        setCurrentWidth(ele?.style?.width || 1000);
        setCurrentHeight(ele?.style?.height || 2000);
        setCurrentBackgroudColor(ele?.style?.backgroundColor || '#ffffff');
      }
    })

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
  }, [currentBackgroundColor])
  return (
    <List sx={{ height: "100%" }}>
      <Divider />
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
            value={currentWidth}
            onChange={(event) => {setCurrentWidth?.(parseInt(event.target.value || 1000))}}
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
            value={currentHeight}
            onChange={(event) => {setCurrentHeight?.(parseInt(event.target.value) || 2000)}}
            onBlur={handleUpdateData}
          />
        </div>
      </ListItem>
      <Divider className="mt-10" />
      <ListItem>
        <span className="pl-[5%] mt-6 text-sm font-bold">Style</span>
      </ListItem>
      <ListItem className="flex">
        <div
          onClick={(event) => {
            setShowColorPicker?.(true);
            event.stopPropagation();
          }}
        >
          <TextField
            className="mr-[50%]"
            size='small'
            variant="standard"
            label='Color'
            value={currentBackgroundColor}
          />
          <div
            className="h-4 w-4 absolute left-[35%] bottom-4"
            style={{ backgroundColor: `${currentBackgroundColor || '#ffffff'}` }}>
          </div>
          <div className={`${showColorPicker ? "block" : "hidden"} absolute mt-4 z-10`}>
            <TwitterPicker
              colors={['#FFFFFF', '#000000', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
              width='150px'
              color={currentBackgroundColor}
              onChange={(color) => {
                setCurrentBackgroudColor?.(color.hex || '#ffffff')
              }}
            />
          </div>
        </div>
      </ListItem>
    </List>
  )
}

export default PageInfo