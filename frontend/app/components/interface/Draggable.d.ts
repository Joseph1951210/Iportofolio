export interface draggableProps {
    id: number,
    type?: string,
    value?: string,
    setValue?: (val: string, id?: number) => void;
    x?: number,
    y?: number,
    style?: object,
    src?: string,
    srcList?: string[],
    cols?: number,
    gap?: number,
    color?: string,
    link?: string,
    variant?: string,
    size?: string,
    disabled?: boolean,
    setFocusedElementId?: (id: number) => void;
    handlePositionChange?: (x: number, y: number, id: number) => void;
}