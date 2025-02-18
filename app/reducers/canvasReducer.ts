export const initialState = {
  shapes: [],
  history: [],
  future: [],
};

export function canvasReducer(state, action) {
  switch (action.type) {
    case "ADD_SHAPE": {
      const newShape = action.payload;
      const newShapes = [...state.shapes, newShape];

      const updatedHistory =
        state.shapes.length === 0
          ? [JSON.parse(JSON.stringify(newShapes))]
          : [...state.history, JSON.parse(JSON.stringify(state.shapes))];

      return {
        ...state,
        shapes: newShapes,
        history: updatedHistory,
        future: [],
      };
    }

    case "UPDATE_SHAPE": {
      const updatedShapes = state.shapes.map((shape, i) =>
        i === action.index ? { ...shape, ...action.payload } : shape
      );

      return {
        ...state,
        shapes: updatedShapes,
        history: [...state.history, JSON.parse(JSON.stringify(updatedShapes))],
        future: [],
      };
    }

    case "UNDO": {
      if (state.history.length === 0) return state;

      const previousState = state.history[state.history.length - 1];

      return {
        ...state,
        shapes: [...previousState],
        history: state.history.slice(0, -1),
        future: [JSON.parse(JSON.stringify(state.shapes)), ...state.future],
      };
    }

    case "REDO": {
      if (state.future.length === 0) return state;

      const nextState = state.future[0];

      return {
        ...state,
        shapes: [...nextState],
        history: [...state.history, JSON.parse(JSON.stringify(state.shapes))],
        future: state.future.slice(1),
      };
    }

    case "LOAD_SAVED": {
      const { shapes, history, future } = action.payload;
      return {
        ...state,
        shapes: [...shapes],
        history,
        future,
      };
    }

    default:
      return state;
  }
}
