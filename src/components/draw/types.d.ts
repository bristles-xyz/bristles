/*interface Draw {
  ctx: CanvasRenderingContext2D
  currentPoint: Point
  prevPoint: Point | null
  initialPoint: Point | null
  snapshot: ImageData | null
}
*/

export type TOOL_MOVE = 'move'
export type TOOL_SELECTOR = 'selector'
export type TOOL_TEXT = 'text'
export type TOOL_RECTANGLE = 'rectangle'
export type TOOL_LINE = 'line'

export type Shapes = TOOL_RECTANGLE | TOOL_LINE | TOOL_TEXT

export type DRAWING_TOOL_LIST = TOOL_RECTANGLE | TOOL_LINE
export type TOOL_LIST = TOOL_MOVE | TOOL_SELECTOR | TOOL_TEXT | TOOL_RECTANGLE | TOOL_LINE