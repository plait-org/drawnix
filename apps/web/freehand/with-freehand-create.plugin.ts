import {
  BoardTransforms,
  PlaitBoard,
  PlaitPointerType,
  Point,
  Transforms,
  createG,
  preventTouchMove,
  toPoint,
  transformPoint,
} from '@plait/core';
import { BoardCreationMode, isDrawingMode, setCreationMode } from '@plait/common';
import { FreehandShape, PlaitFreehand } from './interfaces/free-hand';
import { FreehandPointerType, getFreehandPointers } from './pointer';
import { PenShapeGenerator } from './generator/pen-shape.generator';
import { createFreehandElement } from './utils';
import { DefaultFreehandProperty } from './constants/freehand';

const hotKey = ['1', 'p'];

export const withFreehandCreate = (board: PlaitBoard) => {
  const { pointerDown, pointerMove, pointerUp, keydown } = board;
  let isDrawing: boolean = false;

  let points: Point[] = [];

  let freehandShapeG: SVGGElement | null = null;

  let temporaryElement: PlaitFreehand | null = null;


  board.keydown = (event: KeyboardEvent) => {
    if (PlaitBoard.isReadonly(board)) {
        keydown(event);
        return;
    }
    if (hotKey.includes(event.key) && !PlaitBoard.isPointer(board, FreehandShape.ballpointPen)) {
        BoardTransforms.updatePointerType(board, FreehandShape.ballpointPen);
        setCreationMode(board, BoardCreationMode.drawing);
        event.preventDefault();
        return;
    }
    keydown(event);
  };

  board.pointerDown = (event: PointerEvent) => {
    const freehandPointers = getFreehandPointers();
    const isFreehandPointer = PlaitBoard.isInPointer(board, freehandPointers);
    if (isFreehandPointer && isDrawingMode(board)) {
      isDrawing = true;
      const point = transformPoint(
        board,
        toPoint(event.x, event.y, PlaitBoard.getHost(board))
      );
      points.push(point);
      preventTouchMove(board, event, true);
    }
    pointerDown(event);
  };

  board.pointerMove = (event: PointerEvent) => {
    if (isDrawing) {
      freehandShapeG?.remove();
      freehandShapeG = createG();
      const penShapeGenerator = new PenShapeGenerator(board);
      const movingPoint = transformPoint(
        board,
        toPoint(event.x, event.y, PlaitBoard.getHost(board))
      );
      points.push(movingPoint);
      const pointer = PlaitBoard.getPointer(board) as FreehandPointerType;
      temporaryElement = createFreehandElement(pointer, points, {
        strokeColor: DefaultFreehandProperty.strokeColor,
        strokeWidth: DefaultFreehandProperty.strokeWidth,
      });
      penShapeGenerator.draw(temporaryElement, freehandShapeG);
      PlaitBoard.getElementActiveHost(board).append(freehandShapeG);
    }

    pointerMove(event);
  };

  board.pointerUp = (event: PointerEvent) => {
    if (isDrawing) {
      const pointer = PlaitBoard.getPointer(board) as FreehandPointerType;
      temporaryElement = createFreehandElement(
        pointer as unknown as FreehandPointerType,
        points,
        {
          strokeColor: DefaultFreehandProperty.strokeColor,
          strokeWidth: DefaultFreehandProperty.strokeWidth,
        }
      );
    }
    if (temporaryElement) {
      Transforms.insertNode(board, temporaryElement, [board.children.length]);
    }
    freehandShapeG?.remove();
    freehandShapeG = null;
    temporaryElement = null;
    isDrawing = false;
    points = [];
    preventTouchMove(board, event, false);
    pointerUp(event);
  };

  return board;
};
