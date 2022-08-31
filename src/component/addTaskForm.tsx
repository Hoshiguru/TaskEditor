import React, { useState } from "react";
import { Itasks} from './TaskModel';
import validator, { noErrors, FormErrors } from "../validator";

interface Props {
    task?: Itasks;
    onAddTask: (task:Itasks)=>void;
}

const initTask = { title: "", completed: false};
const AddTaskForm: React.FC<Props> = (props) => {
    const [formValue, setFormValue] = useState(initTask);
    const [errors, setErrors] = useState<FormErrors>({});

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onAddTask(formValue);
    const rules = [{key: "title", required: true, label: "title" }];
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue)
  };
  return (
    <div className="user-form">
      <h1>add users</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Task</label>
          <input
            type="text"
            placeholder="please input a task"
            name="title"
            value={formValue.title}
            onChange={onInputChange}
          />
          {errors["taskName"] && errors["taskName"].length > 0 && (
            <div className="form-error">{errors["taskName"].join(",")}</div>
          )}
        </div>
        <div className="form-row">
          <button>Add new task</button>
        </div>
      </form>
    </div>
  );
}
export default AddTaskForm;
