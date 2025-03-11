import React, { useEffect, useState } from "react"
import { Input, List, ListItem, ListItemText, Select, MenuItem, TextField, InputAdornment } from "@mui/material";
import Divider from '@mui/material/Divider';
import { InfoProps } from "../interface/Info";
import { TwitterPicker } from "react-color";

type IconType =
    "facebook"
    | "instagram"
    | "linkedin"
    | "gitHub"
    | "x"
    | string
const IconInfo: React.FC<InfoProps> = ({ id, currentPage, setCurrentPage }) => {
  const eleType = currentPage?.find?.((ele: any) => {
    return ele?.id == id})?.type || '';
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [value, setValue] = useState<IconType>('facebook');
  const [color, setColor] = useState<string>('black');
  const [size, setSize] = useState<number>(24);
  const [link, setLink] = useState<string>('');
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const handleUpdateData = () => {
    currentPage?.forEach?.((ele: any) => {
      if (ele?.id == id) {
        ele.x = x;
        ele.y = y;
        ele.value = value;
        ele.color = color;
        ele.size = size + 'px';
        ele.link = link;
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
        ele.x = ele?.x || x;
        ele.y = ele?.y || y;
        ele.value = ele?.value || value;
        ele.color = ele?.color || color;
        ele.size = ele?.size || size;
        ele.link = ele?.link || link;
      }
    });
    // Deep copy
    setCurrentPage([...currentPage]);

    // Set color picker close
    document.body.addEventListener('click', () => handleClickOutside());

    return () => {
      document.body.removeEventListener('click', () => handleClickOutside());
    }
  }, []);

  useEffect(() => {
    currentPage?.forEach?.((ele: any) => {
      if (ele?.id == id) {
        setX(ele?.x || 0);
        setY(ele?.y || 0);
      }})
  }, [currentPage]);

  useEffect(() => {
    currentPage?.forEach?.((ele: any) => {
      if (ele?.id == id) {
        setX(ele?.x || 0);
        setY(ele?.y || 0);
        setLink(ele?.link || '');
        setValue(ele?.value || 'facebook');
        setColor(ele?.color || 'black');
        setSize(parseInt(ele?.size) || 24);
      }})
  }, [id]);

  useEffect(() => {
    // Prevent from first mount of state change the real data with state's initial data
    if (mounted) {
      handleUpdateData();
    } else {
      setMounted(true);
    }
  }, [value, color])

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
        <span className="pl-[5%] mt-6 text-sm font-bold">Value</span>
      </ListItem>
      <ListItem>
        <div className="flex flex-col justify-between h-14">
          <div style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '12px' }}>Icon Type</div>
          <Select
            value={value}
            label="IconType"
            size="small"
            onChange={(e) => {setValue(e.target.value)}}
          >
            <MenuItem value={'facebook'}>Facebook</MenuItem>
            <MenuItem value={'instagram'}>Instagram</MenuItem>
            <MenuItem value={'linkedin'}>Linkedin</MenuItem>
            <MenuItem value={'gitHub'}>GitHub</MenuItem>
            <MenuItem value={'x'}>X</MenuItem>
          </Select>
        </div>
      </ListItem>
      <Divider className="mt-10" />
      <ListItem>
        <span className="pl-[5%] mt-6 text-sm font-bold">Style</span>
      </ListItem>
      <ListItem>
        <div className="flex justify-around">
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
              label='Color'
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
            label='Size'
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              },
            }}
            value={size}
            onChange={(event) => {setSize?.(parseInt(event.target.value) || 24) }}
            onBlur={handleUpdateData}
          />
        </div>
      </ListItem>
      <Divider className="mt-10" />
      <ListItem>
        <span className="pl-[5%] mt-6 text-sm font-bold">Link</span>
      </ListItem>
      <ListItem>
        <div className="flex w-full">
          <TextField
            size='small'
            variant="standard"
            label='Link'
            sx={{ width: '100%' }}
            value={link}
            onChange={(event) => {setLink?.(event.target.value || '')}}
            onBlur={handleUpdateData}
          />
        </div>
      </ListItem>
    </List>
  )
}

export default IconInfo