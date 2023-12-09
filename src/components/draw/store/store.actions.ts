import type { EndDrawingAction } from './drawing/end'
import type { OnDrawingAction } from './drawing/on'
import type { StartDrawingAction } from './drawing/start'
import type { RedoAction } from './history/redo'
import type { UndoAction } from './history/undo'
import type { EndMovingAction } from './moving/end'
import type { OnMovingAction } from './moving/on'
import type { StartMovingAction } from './moving/start'
import type { EndResizingAction } from './resizing/end'
import type { OnResizingAction } from './resizing/on'
import type { StartResizingAction } from './resizing/start'
import type { RotationEndAction } from './rotating/end'
import type { RotationOnAction } from './rotating/on'
import type { RotationStartAction } from './rotating/start'
import { SelectionCopyAction } from './selection/copy'
import type { SelectionEndAction } from './selection/end'
import type { SelectionOnAction } from './selection/on'
import type { RemoveSelectionAction } from './selection/remove'
import type { SelectionSelectAction } from './selection/select'
import type { SelectionStartAction } from './selection/start'
import { SelectionUpdateAction } from './selection/update'
import type { StorageLoadAction } from './storage/load'
import type { ToolSetAction } from './tool/set'
import type { EndWritingAction } from './writing/end'
import type { StartWritingAction } from './writing/start'

export type DispatchStateAction =
  ToolSetAction |

  StartResizingAction |
  OnResizingAction |
  EndResizingAction |

  StartMovingAction |
  OnMovingAction |
  EndMovingAction |

  StartDrawingAction |
  OnDrawingAction |
  EndDrawingAction |

  StartWritingAction |
  EndWritingAction |

  SelectionStartAction |
  SelectionOnAction |
  SelectionEndAction |
  SelectionSelectAction |
  SelectionCopyAction |
  SelectionUpdateAction |
  RemoveSelectionAction |

  RotationStartAction |
  RotationOnAction |
  RotationEndAction |

  StorageLoadAction |

  RedoAction |
  UndoAction
