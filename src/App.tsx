import { DragDropContext, Draggable, DraggableLocation, DropResult, Droppable } from "react-beautiful-dnd";
import "./App.css";
import { useState } from "react";
import DropppableTask from "./components/DropppableTask";

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
    if (!destination || source.index === destination?.index) return;
    moveItems(source, destination);
  };

  return (
    <div className="global">
      <DragDropContext onDragEnd={onDragEnd}>
        <DropppableTask id="todo" tasks={tasks.todo} />
        <DropppableTask id="doing" tasks={tasks.doing} />
        <DropppableTask id="done" tasks={tasks.done} />
      </DragDropContext>
    </div>
  );
}

export default App;
