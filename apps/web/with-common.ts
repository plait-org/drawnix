import { PlaitBoard } from '@plait/core';

export const withCommon = (board: PlaitBoard) => {
  const { keydown } = board;

  board.keydown = (event: KeyboardEvent) => {
    keydown(event);
  };

  return board;
};
