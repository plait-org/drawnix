import { PlaitElement, Point } from '@plait/core';

export enum FreehandShape {
    fountainPen = 'fountainPen',// fountain pen
    ballpointPen = 'ballpointPen',// felt pen
    brushPen = 'brushPen',
    highlighter = 'highlighter'
}

export interface PlaitFreehand extends PlaitElement {
    type: 'freehand';
    points: Point[]
    shape: FreehandShape;
    strokeColor?: string;
    strokeWidth?: number;
}


export const PlaitFreehand = {
    isFreehand: (value: any): value is PlaitFreehand => {
        return value.type === 'freehand';
    }
};
