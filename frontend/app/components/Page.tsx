"use client"
import React from "react";
import DraggableInput from "./draggable/DraggableInput";
import DraggableImg from "./draggable/DraggableImg";
import DraggableButton from "./draggable/DraggableButton";
import DraggableIcon from "./draggable/DraggableIcon";
import DraggableMasonry from "./draggable/DraggableMasonry";
interface PageProps {
    config: any,
    setCurrentPage?: (value: any) => void;
    setFocusedElementId?: (id: number) => void;
}

const Page: React.FC<PageProps> = ({ config, setCurrentPage, setFocusedElementId }) => {
  const currentPage = config || [];
  const typeToElementMap: object = {
    input: DraggableInput,
    img: DraggableImg,
    button: DraggableButton,
    icon: DraggableIcon,
    masonry: DraggableMasonry
  }

  const pageStyle = currentPage?.map?.((ele) => {
    if (ele?.type == 'page') return ele.style;
  })[0];

  const handlePositionChange = (x: number, y: number, id: number) => {
    currentPage?.forEach?.((ele: any) => {
      if (ele?.id == id) {
        ele.x = x;
        ele.y = y;
      }
    });
    setCurrentPage?.([...currentPage]);
  }

  const handleValueChange = (val: string, id: number) => {
    currentPage?.forEach?.((ele: any) => {
      console.log('fond', ele.id, id);
      if (ele?.id == id) {
        ele.value = val;
      }
    });
    setCurrentPage?.([...currentPage]);
  }

  return (

    <div
      style={{ width: `${pageStyle?.width || 1000}px`,
        height: `${pageStyle?.height || 2000}px`,
        position: 'relative',
        backgroundColor: pageStyle?.backgroundColor || '#ffffff' }}
      onClick={(event) => {
        // Click the empty page to edit page(default info menu)

        // Prevent from event capture phase which may capture child elements' event
        if (event.target == event.currentTarget) {
          setFocusedElementId?.(undefined);
        }
      }}
    >
      {currentPage?.map?.((ele: any) => {
        if (ele?.type == 'page') return;
        const Component = typeToElementMap?.[ele?.type];
        return <Component
          key={ele?.id}
          id={ele?.id}
          value={ele?.value}
          color={ele?.color}
          size={ele?.size}
          srcList={ele?.srcList}
          cols={ele?.cols}
          gap={ele?.gap}
          variant={ele?.variant}
          setValue={(v: string, id: number) => {handleValueChange?.(v, id)}}
          x={ele?.x}
          y={ele?.y}
          handlePositionChange={(x: number, y: number, id: number) => {handlePositionChange?.(x, y, id)}}
          style={ele?.style}
          src={ele?.src}
          link={ele?.link}
          setFocusedElementId={(id: number) => {setFocusedElementId?.(id)}}
        />
      })}
    </div>
  )
}
export default Page