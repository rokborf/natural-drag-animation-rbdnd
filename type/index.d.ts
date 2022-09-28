// Type definitions for natural-drag-animation-rbdnd 2.1
// Project: https://github.com/rokborf/natural-drag-animation-rbdnd#readme
// Definitions by: Prajwal Kulkarni <https://github.com/prajwalkulkarni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped



import * as React from 'react'

type Id = string;
type DraggableId = Id;
type DroppableId = Id;

type MovementMode = 'FLUID' | 'SNAP';
interface Position {
    x: number;
    y: number;
}


interface NotDraggingStyle {
    transform?: string | undefined;
    transition?: 'none' | undefined;
}

interface DraggingStyle {
    position: 'fixed';
    top: number;
    left: number;
    boxSizing: 'border-box';
    width: number;
    height: number;
    transition: 'none';
    transform?: string | undefined;
    zIndex: number;
    opacity?: number | undefined;
    pointerEvents: 'none';
}

interface DraggableStateSnapshot {
    isDragging: boolean;
    isDropAnimating: boolean;
    dropAnimation?: DropAnimation | undefined;
    draggingOver?: DroppableId | undefined;
    // the id of a draggable that you are combining with
    combineWith?: DraggableId | undefined;
    // a combine target is being dragged over by
    combineTargetFor?: DraggableId | undefined;
    // What type of movement is being done: 'FLUID' or 'SNAP'
    mode?: MovementMode | undefined;
}


interface DropAnimation {
    duration: number;
    curve: string;
    moveTo: Position;
    opacity?: number | undefined;
    scale?: number | undefined;
}

export interface NaturalDragAnimationType{
    snapshot: DraggableStateSnapshot;
    style: DraggingStyle | NotDraggingStyle | undefined;
    animationRotationFade?: number;
    rotationMultiplier?: number;
    children: (style: React.CSSProperties) => React.ReactNode;
}


export default class NaturalDragAnimation extends React.Component<NaturalDragAnimationType> {}