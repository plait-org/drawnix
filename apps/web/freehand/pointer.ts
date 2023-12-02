import { FreehandShape } from "./interfaces/free-hand";

export type FreehandPointerType = FreehandShape;

export const getFreehandPointers = () => {
    return Object.keys(FreehandShape);
};