import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import {
  PlaitBoard,
  PlaitPluginElementContext,
  OnContextChanged,
} from '@plait/core';
import { ActiveGenerator, CommonPluginElement } from '@plait/common';
import { PlaitFreehand } from './interfaces/free-hand';
import { PenShapeGenerator } from './generator/pen-shape.generator';

@Component({
  selector: 'plait-freehand-pen',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PlaitFreehandPenComponent
  extends CommonPluginElement<PlaitFreehand, PlaitBoard>
  implements OnInit, OnDestroy, OnContextChanged<PlaitFreehand, PlaitBoard>
{
  activeGenerator!: ActiveGenerator<PlaitFreehand>;

  penShapeGenerator!: PenShapeGenerator;

  constructor(
    private viewContainerRef: ViewContainerRef,
    protected override cdr: ChangeDetectorRef
  ) {
    super(cdr);
  }

  initializeGenerator() {
    this.penShapeGenerator = new PenShapeGenerator(this.board);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.initializeGenerator();
    this.penShapeGenerator.draw(this.element, this.g);
  }

  onContextChanged(
    value: PlaitPluginElementContext<PlaitFreehand, PlaitBoard>,
    previous: PlaitPluginElementContext<PlaitFreehand, PlaitBoard>
  ) {
    if (value.element !== previous.element) {
    } else {
      const hasSameSelected = value.selected === previous.selected;
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
