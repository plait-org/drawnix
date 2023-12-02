import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PlaitBoardChangeEvent,
  PlaitBoardComponent,
  PlaitBoardOptions,
  PlaitElement,
} from '@plait/core';
import { withFreehand } from '../freehand/with-freehand.plugin';
import { withCommon } from '../with-common';
import { ToolbarComponent } from "../components/toolbar/toolbar.component";

@Component({
    selector: 'drawnix-editor',
    standalone: true,
    templateUrl: './editor.component.html',
    host: {
        class: 'drawnix-editor-container',
    },
    imports: [CommonModule, PlaitBoardComponent, ToolbarComponent]
})
export class EditorComponent {
  plugins = [withFreehand, withCommon];
  value: PlaitElement[] = [];

  options: PlaitBoardOptions = {
    readonly: false,
    hideScrollbar: false,
    disabledScrollOnNonFocus: false,
  };

  change(event: PlaitBoardChangeEvent) {}
}
