import { Generator } from '@plait/common';
import { PlaitFreehand } from '../interfaces/free-hand';
import { PlaitBoard, setStrokeLinecap } from '@plait/core';

export interface PenShapeData {}

export class PenShapeGenerator extends Generator<PlaitFreehand, PenShapeData> {
  canDraw(element: PlaitFreehand, data: PenShapeData): boolean {
    return true;
  }

  baseDraw(element: PlaitFreehand, data: PenShapeData) {
    const points = element.points.map((value) => {
      return { x: value[0], y: value[1] };
    });
    const g = PlaitBoard.getRoughSVG(this.board).curve(element.points, { strokeWidth: 24 });
    setStrokeLinecap(g, 'round');
    return g;
  }
}
