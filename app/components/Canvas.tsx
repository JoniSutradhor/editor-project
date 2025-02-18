"use client";

import { useEffect, useReducer, useRef } from "react";
import { Rnd } from "react-rnd";
import html2canvas from "html2canvas";
import { canvasReducer, initialState } from "../reducers/canvasReducer";

export default function Canvas() {
  const [state, dispatch] = useReducer(canvasReducer, initialState);
  const canvasRef = useRef(null);

  useEffect(() => {
    const savedShapes = JSON.parse(localStorage.getItem("shapes")) || [];
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    const savedFuture = JSON.parse(localStorage.getItem("future")) || [];
    dispatch({
      type: "LOAD_SAVED",
      payload: {
        shapes: savedShapes,
        history: savedHistory,
        future: savedFuture,
      },
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("shapes", JSON.stringify(state.shapes));
    localStorage.setItem("history", JSON.stringify(state.history));
    localStorage.setItem("future", JSON.stringify(state.future));
  }, [state.shapes, state.history, state.future]);

  const addShape = (type) => {
    const newShape = {
      type,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
    };
    dispatch({ type: "ADD_SHAPE", payload: newShape });
  };

  const downloadCanvas = async () => {
    if (canvasRef.current) {
      const canvasImage = await html2canvas(canvasRef.current);
      const link = document.createElement("a");
      link.href = canvasImage.toDataURL("image/png");
      link.download = "design.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Design Editor</h1>
      <div className="mb-4">
        <button
          onClick={() => addShape("rectangle")}
          className="mr-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Rectangle
        </button>
        <button
          onClick={() => addShape("circle")}
          className="p-2 bg-green-500 text-white rounded"
        >
          Add Circle
        </button>
        <button
          onClick={() => dispatch({ type: "UNDO" })}
          className="ml-2 p-2 bg-yellow-500 text-white rounded"
        >
          Undo
        </button>
        <button
          onClick={() => dispatch({ type: "REDO" })}
          className="ml-2 p-2 bg-purple-500 text-white rounded"
        >
          Redo
        </button>
        <button
          onClick={downloadCanvas}
          className="ml-2 p-2 bg-red-500 text-white rounded"
        >
          Download
        </button>
      </div>
      <div
        ref={canvasRef}
        className="relative w-[500px] h-[500px] bg-gray-200 border backdrop-blur-lg bg-opacity-50"
      >
        {state.shapes.map((shape, index) => (
          <Rnd
            key={index}
            position={{ x: shape.x, y: shape.y }}
            size={{ width: shape.width, height: shape.height }}
            onDragStop={(e, d) =>
              dispatch({
                type: "UPDATE_SHAPE",
                index,
                payload: { x: d.x, y: d.y },
              })
            }
            onResizeStop={(e, direction, ref, delta, position) =>
              dispatch({
                type: "UPDATE_SHAPE",
                index,
                payload: {
                  width: ref.offsetWidth,
                  height: ref.offsetHeight,
                  x: position.x,
                  y: position.y,
                },
              })
            }
            className="absolute bg-opacity-50"
          >
            <div
              className={`w-full h-full ${
                shape.type === "rectangle"
                  ? "bg-blue-500"
                  : "bg-green-500 rounded-full"
              }`}
            ></div>
          </Rnd>
        ))}
      </div>
    </div>
  );
}
