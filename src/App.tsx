import { DragDropContext, Draggable, DraggableLocation, DropResult, Droppable } from "react-beautiful-dnd";
import "./App.css";
import { useState } from "react";

const data = {
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
};

function App() {
  const [tasks, setTasks] = useState(data);

  const moveItems = (source: DraggableLocation, dest: DraggableLocation) => {
    const sourceIdx = source.index;
    const destIdx = dest.index;
    const tmp = { ...tasks };

    const [deleted] = tmp[source.droppableId].splice(sourceIdx, 1);
    tmp[dest.droppableId].splice(destIdx, 0, deleted);
    setTasks(tmp);
  };
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination || source.index === destination?.index) return;
    moveItems(source, destination);
  };
  return (
    <div className="global">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div className="container todo" ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.todo.map((todo, idx) => (
                <Draggable key={todo.id} draggableId={String(todo.id)} index={idx}>
                  {(provided) => (
                    <div
                      className="item"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <div>{todo.name}</div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="doing">
          {(provided) => (
            <div className="container doing" ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.doing.map((doing, idx) => (
                <Draggable key={doing.id} draggableId={String(doing.id)} index={idx}>
                  {(provided) => (
                    <div
                      className="item"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <div>{doing.name}</div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
