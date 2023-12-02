import { PlaitPointerType } from "@plait/core";
import { FreehandShape } from "../freehand/interfaces/free-hand";

export interface ToolbarItem {
  icon: string;
  name: string;
  hotkey: string;
  pointer: PlaitPointerType | FreehandShape;
  active: () => boolean;
}
