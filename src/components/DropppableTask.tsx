import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskItem, TaskStatus } from "../App";

type DropppableTaskProps = {
  id: TaskStatus;
  tasks: TaskItem[];
};

function DropppableTask({ id, tasks }: DropppableTaskProps) {
  return (
    <div>
      <h2>{id}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div className="container todo" ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, idx) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={idx}>
                {(provided) => (
                  <div
                    className="item"
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <div>{task.name}</div>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default DropppableTask;
