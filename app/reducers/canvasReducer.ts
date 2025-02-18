// export const initialState = {
//     shapes: [],
//   };
  
//   export function canvasReducer(state, action) {
//     switch (action.type) {
//       case "ADD_SHAPE":
//         return { ...state, shapes: [...state.shapes, action.payload] };
//       case "UPDATE_SHAPE":
//         return {
//           ...state,
//           shapes: state.shapes.map((shape, i) =>
//             i === action.index ? { ...shape, ...action.payload } : shape
//           ),
//         };
//       case "LOAD_SAVED":
//         return { ...state, shapes: action.payload };
//       default:
//         return state;
//     }
//   }

// app/reducers/canvasReducer.ts

// Undo/Redo initiate

// export const initialState = {
//     shapes: [],
//     history: [],
//     future: [],
//   };
  
//   export function canvasReducer(state, action) {
//     switch (action.type) {
//       case "ADD_SHAPE":
//         return {
//           ...state,
//           shapes: [...state.shapes, action.payload],
//           history: [...state.history, state.shapes],
//           future: [],
//         };
//       case "UPDATE_SHAPE":
//         return {
//           ...state,
//           shapes: state.shapes.map((shape, i) =>
//             i === action.index ? { ...shape, ...action.payload } : shape
//           ),
//           history: [...state.history, state.shapes],
//           future: [],
//         };
//       case "UNDO":
//         if (state.history.length === 0) return state;
//         const previous = state.history[state.history.length - 1];
//         return {
//           ...state,
//           shapes: previous,
//           history: state.history.slice(0, -1),
//           future: [state.shapes, ...state.future],
//         };
//       case "REDO":
//         if (state.future.length === 0) return state;
//         const next = state.future[0];
//         return {
//           ...state,
//           shapes: next,
//           history: [...state.history, state.shapes],
//           future: state.future.slice(1),
//         };
//       case "LOAD_SAVED":
//         return { ...state, shapes: action.payload };
//       default:
//         return state;
//     }
//   }

// Undo/Redo v2

// export const initialState = {
//     shapes: [],
//     history: [],
//     future: [],
//   };
  
//   export function canvasReducer(state, action) {
//     switch (action.type) {
//       case "ADD_SHAPE": {
//         const newShapes = [...state.shapes, action.payload];
//         return {
//           ...state,
//           shapes: newShapes,
//           history: [...state.history, state.shapes],
//           future: [],
//         };
//       }
//       case "UPDATE_SHAPE": {
//         const updatedShapes = state.shapes.map((shape, i) =>
//           i === action.index ? { ...shape, ...action.payload } : shape
//         );
//         return {
//           ...state,
//           shapes: updatedShapes,
//           history: [...state.history, state.shapes],
//           future: [],
//         };
//       }
//       case "UNDO": {
//         if (state.history.length === 0) return state;
//         const previous = state.history[state.history.length - 1];
//         return {
//           ...state,
//           shapes: previous,
//           history: state.history.slice(0, -1),
//           future: [state.shapes, ...state.future],
//         };
//       }
//       case "REDO": {
//         if (state.future.length === 0) return state;
//         const next = state.future[0];
//         return {
//           ...state,
//           shapes: next,
//           history: [...state.history, state.shapes],
//           future: state.future.slice(1),
//         };
//       }
//       case "LOAD_SAVED": {
//         return {
//           ...state,
//           shapes: action.payload,
//           history: [],
//           future: [],
//         };
//       }
//       default:
//         return state;
//     }
//   }

// Undo redo v3

// export const initialState = {
//     shapes: [],
//     history: [],
//     future: [],
// };

// export function canvasReducer(state, action) {
//     switch (action.type) {
//       case "ADD_SHAPE": {
//         const newShapes = [...state.shapes, action.payload];
//         return {
//           ...state,
//           shapes: newShapes,
//           history: [...state.history, JSON.parse(JSON.stringify(state.shapes))], // Deep copy
//           future: [],
//         };
//       }
//       case "UPDATE_SHAPE": {
//         const updatedShapes = state.shapes.map((shape, i) =>
//           i === action.index ? { ...shape, ...action.payload } : shape
//         );
//         return {
//           ...state,
//           shapes: updatedShapes,
//           history: [...state.history, JSON.parse(JSON.stringify(state.shapes))], // Deep copy
//           future: [],
//         };
//       }
//       case "UNDO": {
//         if (state.history.length === 0) return state;
//         const previous = state.history[state.history.length - 1];
//         return {
//           ...state,
//           shapes: previous,
//           history: state.history.slice(0, -1),
//           future: [JSON.parse(JSON.stringify(state.shapes)), ...state.future], // Deep copy
//         };
//       }
//       case "REDO": {
//         if (state.future.length === 0) return state;
//         const next = state.future[0];
//         return {
//           ...state,
//           shapes: next,
//           history: [...state.history, JSON.parse(JSON.stringify(state.shapes))], // Deep copy
//           future: state.future.slice(1),
//         };
//       }
//       case "LOAD_SAVED": {
//         return {
//           ...state,
//           shapes: action.payload,
//           history: [],
//           future: [],
//         };
//       }
//       default:
//         return state;
//     }
// }

// export const initialState = {
//     shapes: [],
//     history: [],
//     future: [],
//   };
  
//   export function canvasReducer(state, action) {
//     switch (action.type) {
//       case "ADD_SHAPE": {
//         const newShapes = [...state.shapes, action.payload];
//         return {
//           ...state,
//           shapes: newShapes,
//           history: [...state.history, JSON.parse(JSON.stringify(state.shapes))], // Deep copy of shapes state
//           future: [],
//         };
//       }
//       case "UPDATE_SHAPE": {
//         const updatedShapes = state.shapes.map((shape, i) =>
//           i === action.index ? { ...shape, ...action.payload } : shape
//         );
//         return {
//           ...state,
//           shapes: updatedShapes,
//           history: [...state.history, JSON.parse(JSON.stringify(state.shapes))], // Deep copy
//           future: [],
//         };
//       }
//       case "UNDO": {
//         if (state.history.length === 0) return state;
//         const previous = state.history[state.history.length - 1];
//         return {
//           ...state,
//           shapes: previous,
//           history: state.history.slice(0, -1),
//           future: [JSON.parse(JSON.stringify(state.shapes)), ...state.future], // Deep copy
//         };
//       }
//       case "REDO": {
//         if (state.future.length === 0) return state;
//         const next = state.future[0];
//         return {
//           ...state,
//           shapes: next,
//           history: [...state.history, JSON.parse(JSON.stringify(state.shapes))], // Deep copy
//           future: state.future.slice(1),
//         };
//       }
//       case "LOAD_SAVED": {
//         return {
//           ...state,
//           shapes: action.payload,
//           history: [],
//           future: [],
//         };
//       }
//       default:
//         return state;
//     }
//   }

// export const initialState = {
//     shapes: [],
//     history: [],
//     future: [],
//   };
  
//   export function canvasReducer(state, action) {
//     switch (action.type) {
//       case "ADD_SHAPE": {
//         const newShapes = [...state.shapes, action.payload];
//         return {
//           ...state,
//           shapes: newShapes,
//           history: [...state.history, JSON.parse(JSON.stringify(state.shapes))], // Store full shape state in history
//           future: [],
//         };
//       }
//       case "UPDATE_SHAPE": {
//         const updatedShapes = state.shapes.map((shape, i) =>
//           i === action.index ? { ...shape, ...action.payload } : shape
//         );
//         return {
//           ...state,
//           shapes: updatedShapes,
//           history: [...state.history, JSON.parse(JSON.stringify(state.shapes))], // Store updated state in history
//           future: [],
//         };
//       }
//       case "UNDO": {
//         if (state.history.length === 0) return state;
//         const previous = state.history[state.history.length - 1];
//         return {
//           ...state,
//           shapes: previous,
//           history: state.history.slice(0, -1),
//           future: [JSON.parse(JSON.stringify(state.shapes)), ...state.future], // Save current state to future
//         };
//       }
//       case "REDO": {
//         if (state.future.length === 0) return state;
//         const next = state.future[0];
//         return {
//           ...state,
//           shapes: next,
//           history: [...state.history, JSON.parse(JSON.stringify(state.shapes))], // Store next state in history
//           future: state.future.slice(1),
//         };
//       }
//       case "LOAD_SAVED": {
//         const { shapes, history, future } = action.payload;
//         return {
//           ...state,
//           shapes,
//           history,
//           future,
//         };
//       }
//       default:
//         return state;
//     }
//   }
  

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
        return {
          ...state,
          shapes: newShapes,
          history: [...state.history, JSON.parse(JSON.stringify(state.shapes))], // Store shapes deep copy in history
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
          history: [...state.history, JSON.parse(JSON.stringify(state.shapes))], // Store updated shapes in history
          future: [],
        };
      }
      case "UNDO": {
        if (state.history.length === 0) return state;
        const previousState = state.history[state.history.length - 1];
        return {
          ...state,
          shapes: previousState,
          history: state.history.slice(0, -1),
          future: [JSON.parse(JSON.stringify(state.shapes)), ...state.future], // Save current state to future
        };
      }
      case "REDO": {
        if (state.future.length === 0) return state;
        const nextState = state.future[0];
        return {
          ...state,
          shapes: nextState,
          history: [...state.history, JSON.parse(JSON.stringify(state.shapes))], // Save next state to history
          future: state.future.slice(1),
        };
      }
      case "LOAD_SAVED": {
        const { shapes, history, future } = action.payload;
        return {
          ...state,
          shapes,
          history,
          future,
        };
      }
      default:
        return state;
    }
  }
  
  
