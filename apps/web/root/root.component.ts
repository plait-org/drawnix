import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EditorComponent } from "../editor/editor.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './root.component.html',
    imports: [CommonModule, RouterOutlet, EditorComponent]
})
export class AppComponent {
}
