import { PlaitPointerType } from "@plait/core";
import { highlighterHotkey, penHotkey, selectHotkey } from "./constants/pointer";
import { FreehandShape } from "./interfaces/free-hand";

export type FreehandPointerType = FreehandShape;

export const getFreehandPointers = () => {
    return Object.keys(FreehandShape) as FreehandShape[];
};

export const getHotkeyByPointer = (pointer: FreehandShape | PlaitPointerType) => {
    if (pointer === FreehandShape.ballpointPen) {
        return penHotkey;
    }
    if (pointer === FreehandShape.highlighter) {
        return highlighterHotkey;
    }
    if (pointer === PlaitPointerType.selection) {
        return selectHotkey;
    }
    return [];
}