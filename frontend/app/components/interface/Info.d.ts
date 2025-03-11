import { draggableProps } from "./draggable";
export interface InfoProps {
    id: number,
    currentPage: draggableProps[],
    setCurrentPage: (value: draggableProps[]) => void;
}