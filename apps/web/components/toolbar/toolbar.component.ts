import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarItem } from '../../types/toolbar';
import { HighlighterIcon, PenIcon, SelectIcon } from '../../icons/resources';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { PlaitIslandBaseComponent } from '@plait/core';

@Component({
  selector: 'drawnix-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  imports: [CommonModule, IconButtonComponent],
  host: {
    class: 'drawnix-toolbar-container'
  }
})
export class ToolbarComponent extends PlaitIslandBaseComponent {
  items: ToolbarItem[] = [
    {
      name: 'Select',
      icon: SelectIcon,
      hotkey: `0`,
    },
    {
      name: 'Pen',
      icon: PenIcon,
      hotkey: `1`,
    },
    {
      name: 'Highlighter',
      icon: HighlighterIcon,
      hotkey: `2`,
    },
  ];
}
