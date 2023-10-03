import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskItem, TaskStatus } from "../App";

type DropppableTaskProps = {
  id: TaskStatus;
  tasks: TaskItem[];
  deleteTask: (status: TaskStatus, id: number) => void;
};

function DropppableTask({ id, tasks, deleteTask }: DropppableTaskProps) {
  return (
    <div>
      <h2>{id}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div className="container" ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, idx) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={idx}>
                {(provided) => (
                  <div
                    className="item"
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="task-content">{task.name}</span>
                      <span className="delete-button" onClick={() => deleteTask(id, task.id)}>
                        &times;
                      </span>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default DropppableTask;
