import { DragDropContext, Draggable, DraggableLocation, DropResult, Droppable } from "react-beautiful-dnd";
import "./App.css";
import { useState } from "react";
import DropppableTask from "./components/DropppableTask";
import InputBar from "./components/InputBar";

export type TaskItem = {
  id: number;
  name: string;
};

export type TaskStatus = "todo" | "doing" | "done";
export type Task = {
  [status in TaskStatus]: TaskItem[];
};

const data: Task = {
  todo: [
    {
      id: 1,
      name: "aaa",
    },
    {
      id: 2,
      name: "bbb",
    },
    {
      id: 3,
      name: "ccc",
    },
  ],
  doing: [
    {
      id: 4,
      name: "ddd",
    },
  ],
  done: [
    {
      id: 5,
      name: "eee",
    },
  ],
};

function App() {
  const [tasks, setTasks] = useState(data);

  const moveItems = (source: DraggableLocation, dest: DraggableLocation) => {
    const sourceIdx = source.index;
    const destIdx = dest.index;
    const tmp = { ...tasks };

    const [deleted] = tmp[source.droppableId as TaskStatus].splice(sourceIdx, 1);
    tmp[dest.droppableId as TaskStatus].splice(destIdx, 0, deleted);
    setTasks(tmp);
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    moveItems(source, destination);
  };

  const addTask = (text: string) => {
    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, { id: new Date().getTime(), name: text }],
    }));
  };

  const deleteTask = (status: TaskStatus, id: number) => {
    setTasks((prev) => ({ ...prev, [status]: prev[status].filter((item) => item.id !== id) }));
  };

  return (
    <div className="global">
      <div className="wrapper">
        <DragDropContext onDragEnd={onDragEnd}>
          <DropppableTask id="todo" tasks={tasks.todo} deleteTask={deleteTask} />
          <DropppableTask id="doing" tasks={tasks.doing} deleteTask={deleteTask} />
          <DropppableTask id="done" tasks={tasks.done} deleteTask={deleteTask} />
        </DragDropContext>
      </div>
      <InputBar addTask={addTask} />
    </div>
  );
}

export default App;
