import { BoardTransforms, PlaitBoard, PlaitPointerType } from '@plait/core';

const hotKey = ['0', 'v'];

export const withCommon = (board: PlaitBoard) => {
  const { keydown } = board;

  board.keydown = (event: KeyboardEvent) => {
    if (PlaitBoard.isReadonly(board)) {
      keydown(event);
      return;
    }
    if (
      hotKey.includes(event.key) &&
      !PlaitBoard.isPointer(board, PlaitPointerType.selection)
    ) {
      BoardTransforms.updatePointerType(board, PlaitPointerType.selection);
      event.preventDefault();
      return;
    }
    keydown(event);
  };

  return board;
};
