import { PlaitBoard, PlaitElement, PlaitPluginElementContext } from "@plait/core";
import { PlaitFreehand } from "./interfaces/free-hand";
import { getRectangleByPoints } from "@plait/common";
import { withFreehandCreate } from "./with-freehand-create.plugin";
import { PlaitFreehandPenComponent } from "./pen.component";

export const withFreehand = (board: PlaitBoard) => {
    const { getRectangle, drawElement } = board;

    board.drawElement = (context: PlaitPluginElementContext) => {
        if (PlaitFreehand.isFreehand(context.element)) {
            return PlaitFreehandPenComponent;
        }
        return drawElement(context);
    }

    board.getRectangle = (element: PlaitElement) => {
        if (PlaitFreehand.isFreehand(element)) {
            return getRectangleByPoints(element.points);
        }
        return getRectangle(element);
    }

    return withFreehandCreate(board);
}
