import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'drawnix-icon-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-button.component.html',
  host: {
    class: 'drawnix-icon-button'
  }
})
export class IconButtonComponent implements OnInit {
  constructor(private domSanitizer: DomSanitizer, private elementRef: ElementRef<HTMLElement>) {}


  @Input() iconSvg!: string;

  ngOnInit(): void {
    // const xx = this.domSanitizer.bypassSecurityTrustHtml(this.iconSvg);
    this.elementRef.nativeElement.innerHTML = this.iconSvg;
  }


}
