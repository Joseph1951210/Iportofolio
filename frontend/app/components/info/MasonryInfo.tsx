import React, { useEffect, useState } from "react"
import { Input, List, ListItem, ListItemText, Select, MenuItem, Button, TextField, InputAdornment } from "@mui/material";
import Divider from '@mui/material/Divider';
import { InfoProps } from "../interface/Info";

const MasonryInfo: React.FC<InfoProps> = ({ id, currentPage, setCurrentPage }) => {
  const eleType = currentPage?.find?.((ele: any) => {
    return ele?.id == id})?.type || '';
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [src, setSrc] = useState<string>('');
  const [srcList, setSrcList] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(300);
  const [cols, setCols] = useState<number>(4);
  const [gap, setGap] = useState<number>(8);
  const [mounted, setMounted] = useState<boolean>(false);

  const handleUpdateData = () => {
    currentPage?.forEach?.((ele: any) => {
      if (ele?.id == id) {
        ele.x = x;
        ele.y = y;
        ele.srcList = srcList;
        ele.style = { width, height };
        ele.cols = cols;
        ele.gap = gap;
      }
    });

    // Deep copy
    setCurrentPage([...currentPage]);
  }

  useEffect(() => {
    currentPage?.forEach?.((ele: any) => {
      if (ele?.id == id) {
        ele.x = ele?.x || x;
        ele.y = ele?.y || y;
        ele.srcList = ele?.srcList || srcList;
        ele.style = ele?.style || { width, height };
        ele.cols = ele?.cols || cols;
        ele.gap = ele?.gap || gap;
      }
    });
    // Deep copy
    setCurrentPage([...currentPage]);
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
        setSrcList(ele?.srcList || '');
        setWidth(ele?.style?.width || 300);
        setHeight(ele?.style?.height || 300);
        setCols(ele?.cols || 4);
        setGap(ele?.gap || 8);
      }})
  }, [id]);

  useEffect(() => {
    // Prevent from first mount of state change the real data with state's initial data
    if (mounted) {
      handleUpdateData();
    } else {
      setMounted(true);
    }
  }, [srcList])

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
            onChange={(event) => {setWidth?.(parseInt(event?.target?.value) || 0)}}
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
            onChange={(event) => {setHeight?.(parseInt(event?.target?.value) || 0)}}
            onBlur={handleUpdateData}
          />
        </div>
      </ListItem>
      <ListItem>
        <div className="flex">
          <TextField
            className="mr-[25%]"
            size='small'
            variant="standard"
            label='Columns'
            value={cols}
            onChange={(event) => {setCols?.(parseInt(event?.target?.value) || 0)}}
            onBlur={handleUpdateData}
          />
          <TextField
            size='small'
            variant="standard"
            label='Gap'
            value={gap}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              },
            }}
            onChange={(event) => {setGap?.(parseInt(event?.target?.value) || 0)}}
            onBlur={handleUpdateData}
          />
        </div>
      </ListItem>
      <Divider className="mt-10" />
      <ListItem>
        <span className="pl-[5%] mt-6 text-sm font-bold">Source</span>
      </ListItem>
      <ListItem>
        <div className="w-full flex">
          <TextField
            className="w-full"
            variant="standard"
            label='Src'
            value={src}
            onChange={(event) => {setSrc?.(event.target.value || '')}}
          />
        </div>
        <Button onClick={() => {
          setSrcList([...srcList, src]);
        }}
        >Add Image</Button>
        <Button color="error" onClick={() => {
          srcList?.pop?.();
          setSrcList([...srcList]);
        }}
        >Delete Last One</Button>

      </ListItem>
    </List>
  )
}

export default MasonryInfo