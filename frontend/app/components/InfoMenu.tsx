import React, { useEffect, useState } from "react"
import { Button, Card } from "@mui/material";
import InputInfo from "./info/InputInfo";
import ImgInfo from "./info/ImgInfo";
import ButtonInfo from "./info/ButtonInfo";
import IconInfo from "./info/IconInfo";
import MasonryInfo from "./info/MasonryInfo";
import PageInfo from "./info/PageInfo";
import { InfoProps } from "./interface/Info";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
interface InfoMenuProps {
  deleteElement: () => void;
  deleteAllElements: () => void;
  copyElement: () => void;
  savePage: () => void;
}
const InfoMenu: React.FC<InfoProps & InfoMenuProps> = ({
  id,
  currentPage,
  setCurrentPage,
  deleteElement,
  deleteAllElements,
  copyElement,
  savePage
}) => {
  const [currentType, setCurrentType] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(true);
  const typeToInfoMap = {
    input: InputInfo,
    img: ImgInfo,
    button: ButtonInfo,
    icon: IconInfo,
    masonry: MasonryInfo,
    "": PageInfo,
  }
  const InfoElement = typeToInfoMap?.[currentType];

  const handleArrowClick = () => {
    setExpanded(!expanded);
  }
  useEffect(() => {
    let isFound = false;
    currentPage?.forEach?.((ele) => {
      if (ele?.id == id) {
        setCurrentType(ele.type || '');
        isFound = true;
      }
    })
    if (!isFound) setCurrentType('');
  }, [id])
  return (
    <Card
      className="h-screen flex flex-col"
      sx={{
        padding: '10px',
        width: `${expanded ? '300px' : '20px'}`,
        transition: 'width 1s ease-in-out',
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      }}>
      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full border-2 p-1 bg-white z-10 flex justify-center items-center"
        onClick={handleArrowClick}
      >
        {expanded ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
      </div>
      <div
        className="flex h-[50px] justify-between items-center"
        style={{
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          transition: 'opacity 1s ease, visibility 1s ease',
          visibility: `${expanded ? 'visible' : 'hidden'}`,
          opacity: `${expanded ? '1' : '0'}`,
        }}
      >
        <span className="pl-[5%] text-sm font-bold leading-[50px] flex-1">
          {currentType?.charAt(0)?.toUpperCase() + currentType?.slice(1) || 'Page'} Info Menu
        </span>
        {currentType &&
        <>
          <Button
            color="success"
            variant="outlined"
            size="small"
            sx={{ height: "30px", fontSize: '12px', marginRight: '3px' }}
            onClick={() => {copyElement?.()}}
          >Copy</Button>
          <Button
            color="warning"
            variant="outlined"
            size="small"
            sx={{ height: "30px", fontSize: '12px' }}
            onClick={() => {deleteElement?.()}}
          >Delete</Button>
        </>
        }
      </div>
      <div
        className="flex-1 overflow-auto"
        style={{
          transition: 'opacity 1s ease, visibility 1s ease',
          visibility: `${expanded ? 'visible' : 'hidden'}`,
          opacity: `${expanded ? '1' : '0'}`,
        }}
      >
        <InfoElement
          id={id}
          currentPage={currentPage}
          setCurrentPage={(v) => {setCurrentPage?.(v)}}
        />
      </div>
      <div
        className="flex h-[50px] w-full justify-around items-center bg-white z-10"
        style={{
          overflowX: 'hidden',
          transition: 'opacity 1s ease, visibility 1s ease',
          visibility: `${expanded ? 'visible' : 'hidden'}`,
          opacity: `${expanded ? '1' : '0'}`,
        }}
      >
        <Button
          color="error"
          variant="outlined"
          size="small"
          sx={{ height: "30px", fontSize: '12px' }}
          onClick={() => {deleteAllElements?.()}}
        >Clear Page</Button>
        <Button
          color="primary"
          variant="outlined"
          size="small"
          sx={{ height: "30px", fontSize: '12px' }}
          onClick={() => {savePage?.()}}
        >Save</Button>
      </div>
    </Card>
  )
}

export default InfoMenu