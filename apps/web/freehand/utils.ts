import { Point, idCreator } from '@plait/core';
import { FreehandShape, PlaitFreehand } from './interfaces/free-hand';
import { StrokePoint } from './interfaces/stroke-point';

export const createFreehandElement = (
  shape: FreehandShape,
  points: Point[],
  options?: Pick<PlaitFreehand, 'strokeColor' | 'strokeWidth'>
): PlaitFreehand => {
  return {
    id: idCreator(),
    type: 'freehand',
    shape,
    points,
    ...options,
  };
};

/**
 * Turn an array of stroke points into a path of quadradic curves.
 *
 * @param points - The stroke points returned from perfect-freehand
 * @param closed - Whether the shape is closed
 */
export function getSvgPathFromStrokePoints(points: Point[], closed = false): string {
	const len = points.length

	if (len < 2) {
		return ''
	}

	let a = points[0]
	let b = points[1]

	if (len === 2) {
		return `M${precise(a)}L${precise(b)}`
	}

	let result = ''

	for (let i = 2, max = len - 1; i < max; i++) {
		a = points[i]
		b = points[i + 1]
		result += average(a, b)
	}

	if (closed) {
		// If closed, draw a curve from the last point to the first
		return `M${average(points[0], points[1])}Q${precise(points[1])}${average(
			points[1],
			points[2]
		)}T${result}${average(points[len - 1], points[0])}${average(
			points[0],
			points[1]
		)}Z`
	} else {
		// If not closed, draw a curve starting at the first point and
		// ending at the midpoint of the last and second-last point, then
		// complete the curve with a line segment to the last point.
		return `M${precise(points[0])}Q${precise(points[1])}${average(
			points[1],
			points[2]
		)}${points.length > 3 ? 'T' : ''}${result}L${precise(points[len - 1])}`
	}
}

/**
 * The DOM likes values to be fixed to 3 decimal places
 *
 * @public
 */
export function toDomPrecision(v: number) {
	return +v.toFixed(4)
}

/**
 * @public
 */
export function toFixed(v: number) {
	return +v.toFixed(2)
}

/** @public */
export function precise(a: Point) {
	return `${toDomPrecision(a[0])},${toDomPrecision(a[1])} `
}

/** @public */
export function average(a: Point, b: Point) {
	return `${toDomPrecision((a[0] + b[0]) / 2)},${toDomPrecision((a[1] + b[1]) / 2)} `
}
