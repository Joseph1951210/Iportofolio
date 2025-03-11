import React, { useState } from "react"
import { Button, Card, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ImgUploadDialog from './ImgUploadDialog'
import InputIcon from '@mui/icons-material/Input';
import ImageIcon from '@mui/icons-material/Image';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AppsIcon from '@mui/icons-material/Apps';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from "next/navigation";
interface CreateMenuProps {
    currentPage: any,
    setCurrentPage: (value: any) => void;
    setFocusedElementId: (id: number) => void;
}
const CreateMenu: React.FC<CreateMenuProps> = ({ currentPage, setCurrentPage, setFocusedElementId }) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [isImgUploadDialogOpen, setIsImgUploadDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  /*
   * Create a element in the paper
   * eleType: The type of the element. e.g., input
   */
  const createElement = (eleType: string, src?: string) => {
    // Use the time stamp to set the id of the element
    const newId = Date.now();
    const newPage = [...currentPage, { id: newId, type: eleType, src: src || '' }];
    setFocusedElementId(newId);
    setCurrentPage?.(newPage);
  }

  const handleArrowClick = () => {
    setExpanded(!expanded);
  }

  return (
    <>
      <Card
        className="h-screen flex flex-col"
        sx={{
          padding: '10px',
          width: `${expanded ? '300px' : '20px'}`,
          transition: 'width 1s ease-in-out',
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
        }}>
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 rounded-full border-2 p-1 bg-white z-10 flex justify-center items-center"
          onClick={handleArrowClick}
        >
          {expanded ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
        </div>
        <div
          className="flex h-[50px] items-center justify-around overflow-hidden"
          style={{
            transition: 'opacity 0.5s ease, visibility 0.5s ease',
            visibility: `${expanded ? 'visible' : 'hidden'}`,
            opacity: `${expanded ? '1' : '0'}`,
          }}
        >
          <span
            className="pl-[5%] text-sm font-bold overflow-x-hidden"
            style={{
              whiteSpace: 'nowrap',
            }}
          >
          Iportfolio Elements
          </span>
          <HomeIcon
            className="hover:cursor-pointer"
            onClick={() => {
              router.push('/');
            }} />
        </div>
        <Divider />
        <List
          className="flex-1"
          sx={{ overflow: "auto" }}
          style={{
            transition: 'opacity 1s ease, visibility 0.5s ease',
            visibility: `${expanded ? 'visible' : 'hidden'}`,
            opacity: `${expanded ? '1' : '0'}`,
          }}
        >
          <ListItem>
            <ListItemButton onClick={() => {createElement("input")}}>
              <ListItemIcon>
                <InputIcon />
              </ListItemIcon>
              <ListItemText
                primary="Input"
                secondary="Create styled Text"
                style={{
                  overflow: 'hidden',
                  height: '44px',
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => {
              setIsImgUploadDialogOpen(true);
              // createElement("img");
            }}>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText
                primary="Img"
                secondary="Upload an Image or use an existing URL"
                style={{
                  overflow: 'hidden',
                  height: '64px',
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => {createElement("button")}}>
              <ListItemIcon>
                <TouchAppIcon />
              </ListItemIcon>
              <ListItemText
                primary="Button"
                secondary="Create a Button with an external or internal link"
                style={{
                  overflow: 'hidden',
                  height: '64px',
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => {createElement("icon")}}>
              <ListItemIcon>
                <EmojiEmotionsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Icon"
                secondary="Create an Icon with a link to your social media"
                style={{
                  overflow: 'hidden',
                  height: '64px',
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => {createElement("masonry")}}>
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Masonry"
                secondary="Create a Masonry to display Images"
                style={{
                  overflow: 'hidden',
                  height: '64px',
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Card>
      <ImgUploadDialog
        open={isImgUploadDialogOpen}
        setOpen={(open) => {setIsImgUploadDialogOpen(open)}}
        onConfirm={(url) => createElement("img", url)}
      />
    </>
  )
}

export default CreateMenu