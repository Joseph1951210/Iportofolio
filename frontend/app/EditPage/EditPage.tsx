"use client"
import React, { useContext, useEffect, useState } from "react";
import Page from "../components/Page";
import CreateMenu from "../components/CreateMenu";
import InfoMenu from "../components/InfoMenu";
import { draggableProps } from "../components/interface/draggable";
import ConfirmDialog from "../components/ConfirmDialog";
import { DraggableContext } from "../context/DraggableProvider";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import TitleDialog from "../components/TitleDialog";

interface EditPageProps {
  data?: draggableProps[];
}

const EditPage:React.FC<EditPageProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState<draggableProps[]>(data);
  const [focusedElementId, setFocusedElementId] = useState<number>();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [titleOpen, setTitleOpen] = useState(false);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);
  const { setCurrentFocusedElementId } = useContext(DraggableContext);
  const router = useRouter();
  console.log(currentPage);

  const userName = useSelector(state => state.user.userName);
  if (!userName) {
    if (typeof window !== 'undefined') {
      alert('Please Login!');
    }
    router.push('/');
    return;
  }

  const deleteElement = () => {
    if (!focusedElementId) {
      return;
    };
    setDeleteOpen(true);
  }

  const deleteAllElements = () => {
    setDeleteAllOpen(true);
  }

  const copyElement = () => {
    if (focusedElementId) {
      currentPage?.forEach?.((ele) => {
        if (ele?.id == focusedElementId && ele?.type != 'page') {
          const newEle = { ...ele, id: Date.now(), x: 0, y: 0 };
          currentPage.push(newEle);
        }
      })
    }
    setCurrentPage([...currentPage]);
  }

  const handleSave = async (title) => {
    try {
      const response = await axios.post(`http://43.157.44.225/api/templates/saveWithUser`, {
        username: userName,
        templateName: title,
        jsonData: currentPage
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setCurrentFocusedElementId(focusedElementId);
  }, [focusedElementId])

  useEffect(() => {
    if (data) setCurrentPage(data);
  }, [data])
  return (

    <div className="h-screen w-screen flex justify-center">
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-10">
        <CreateMenu
          currentPage={currentPage}
          setCurrentPage={(v) => {setCurrentPage?.(v)}}
          setFocusedElementId={(id) => {setFocusedElementId(id)}}
        />
      </div>

      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-10">
        <InfoMenu id={focusedElementId}
          currentPage={currentPage}
          setCurrentPage={(v) => {setCurrentPage?.(v)}}
          deleteElement={deleteElement}
          deleteAllElements={deleteAllElements}
          copyElement={copyElement}
          savePage={() => setTitleOpen(true)}
        />
      </div>

      <Page
        config={currentPage}
        setCurrentPage={(value: any) => {setCurrentPage?.(value)}}
        setFocusedElementId={(id: number) => setFocusedElementId(id)}
      />

      <ConfirmDialog open={deleteOpen}
        setOpen={(v) => {
          setDeleteOpen(v);
        }}
        handleAction={() => {
          const _currentPage = currentPage?.filter?.((ele) => {
            if (ele?.id != focusedElementId) {
              console.log(ele, 3);

              return ele;
            }
          });
          console.log(_currentPage);

          setCurrentPage([..._currentPage]);
          setFocusedElementId?.(undefined);
        }}
        title="Are you sure to delete current element?"
        type="Delete"
      />

      <ConfirmDialog open={deleteAllOpen}
        setOpen={(v) => {
          setDeleteAllOpen(v);
        }}
        handleAction={() => {
          const _currentPage = currentPage?.filter?.((ele) => {
            if (ele?.type == 'page') return ele;
          })

          setCurrentPage([..._currentPage]);
          setFocusedElementId?.(undefined);
        }}
        title="Are you sure to clear the whole page?"
        type="Delete"
      />
      <TitleDialog open={titleOpen} handleClose={() => setTitleOpen(false)} handleSave={(title) => handleSave(title)} />
    </div>
  )
}

export default EditPage