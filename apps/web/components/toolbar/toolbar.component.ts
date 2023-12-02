import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarItem } from '../../types/toolbar';
import { HighlighterIcon, PenIcon, SelectIcon } from '../../icons/resources';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import {
  BoardTransforms,
  PlaitBoard,
  PlaitIslandBaseComponent,
  PlaitPointerType,
} from '@plait/core';
import { FreehandShape } from '../../freehand/interfaces/free-hand';
import { BoardCreationMode, setCreationMode } from '@plait/common';
import { ActivePointerPipe } from "../../app/active-pointer.pipe";

@Component({
    selector: 'drawnix-toolbar',
    standalone: true,
    templateUrl: './toolbar.component.html',
    host: {
        class: 'drawnix-toolbar-container',
    },
    providers: [
        {
            provide: PlaitIslandBaseComponent,
            useExisting: forwardRef(() => ToolbarComponent),
        },
    ],
    imports: [CommonModule, IconButtonComponent, ActivePointerPipe]
})
export class ToolbarComponent extends PlaitIslandBaseComponent {
  items: ToolbarItem[] = [
    {
      name: 'Select (0)',
      icon: SelectIcon,
      hotkey: `0`,
      pointer: PlaitPointerType.selection,
      active: () => PlaitBoard.isPointer(this.board, PlaitPointerType.selection)
    },
    {
      name: 'Pen (1)',
      icon: PenIcon,
      hotkey: `1`,
      pointer: FreehandShape.ballpointPen,
      active: () => PlaitBoard.isPointer(this.board, FreehandShape.ballpointPen)
    },
    {
      name: 'Highlighter (2)',
      icon: HighlighterIcon,
      hotkey: `2`,
      pointer: FreehandShape.highlighter,
      active: () => PlaitBoard.isPointer(this.board, FreehandShape.highlighter)
    },
  ];

  pointerDown(event: PointerEvent, pointer: PlaitPointerType | FreehandShape) {
    BoardTransforms.updatePointerType(this.board, pointer);
    setCreationMode(this.board, BoardCreationMode.drawing);
    event.preventDefault();
  }
}
