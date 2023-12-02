import { Point } from "@plait/core"

/**
 * The points returned by `getStrokePoints`, and the input for `getStrokeOutlinePoints`
 *
 * @public
 */
export interface StrokePoint {
	point: Point
	pressure: number
	distance: number
	runningLength: number
	radius: number
}