import { Generator } from '@plait/common';
import { FreehandShape, PlaitFreehand } from '../interfaces/free-hand';
import { PlaitBoard, setStrokeLinecap } from '@plait/core';
import { Options } from 'roughjs/bin/core';

export interface PenShapeData {}

export class PenShapeGenerator extends Generator<PlaitFreehand, PenShapeData> {
  canDraw(element: PlaitFreehand, data: PenShapeData): boolean {
    return true;
  }

  baseDraw(element: PlaitFreehand, data: PenShapeData) {
    let option: Options =
      element.shape === FreehandShape.ballpointPen
        ? { strokeWidth: 4 }
        : { strokeWidth: 12, stroke: '#f08c00' };
    const g = PlaitBoard.getRoughSVG(this.board).curve(element.points, option);
    setStrokeLinecap(g, 'round');
    return g;
  }
}
