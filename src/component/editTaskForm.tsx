import React, { useState, useEffect } from "react";
import { taskId } from "./TaskModel";

interface IProps {
  task: taskId;
  onUpdateTask: (id: number, tasks: taskId) => void;
  setEdit: (bool: boolean) => void;
}

export default function EditTaskForm(props: IProps) {
  const [task, setTask] = useState(props.task);
  useEffect(() => setTask(props.task), [props]);
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task.title || !task.completed) {
      console.log("em");
      return false;
    }
    props.onUpdateTask(task.id, task);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };
  return (  
    <div className="task-form">
      <h1>edit users</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="please input name"
            name="title"
            value={task.title}
            onChange={onInputChange}
          />
          <div className="form-error">too short</div>
        </div>
        <div className="form-row">
          <button>Update</button>
          <button onClick={() => props.setEdit(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
