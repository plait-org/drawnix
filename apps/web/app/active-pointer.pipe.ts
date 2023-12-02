import { Pipe, PipeTransform } from '@angular/core';
import { PlaitBoard, PlaitPointerType } from '@plait/core';
import { FreehandShape } from '../freehand/interfaces/free-hand';

@Pipe({
  name: 'activePointer',
  standalone: true
})
export class ActivePointerPipe implements PipeTransform {

  transform(pointer: PlaitPointerType | FreehandShape, board: PlaitBoard): boolean {
    console.log( `pointer: ${pointer}`);
    return PlaitBoard.isInPointer(board, [pointer]);
  }

}
