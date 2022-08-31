import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import AddTaskForm from './component/addTaskForm';
import { taskId, Itasks } from './component/TaskModel';
import ReactDOM from 'react-dom';
import TaskTable from './component/TaskTable';
import EditTaskForm from './component/editTaskForm';

const baseURL = "http://localhost:3030";

const initCurrentTask: taskId = { title: "", id: 0, completed: false };

function App() {

  const [tasks, setTasks] = useState<taskId[]>([]);
  const [editTask, setEditTask] = useState(initCurrentTask);
  const [editing, setEdit] = useState(false);
  const onCurrentTask = (task: taskId) => {
    setEditTask(task);
    setEdit(true);
  };

  React.useEffect(() => {
    axios.get(`${baseURL}/tasks`).then((response) => {
      console.log(response.data)
      setTasks(response.data); console.log(response.data);
    });
  }, []);

  function createTask(newTask: Itasks) {
    axios
      .post(`${baseURL}/tasks`, newTask)
      .then((response) => {
        const id = tasks.length + 1;
        setTasks([...tasks, { ...newTask, id }]);
      });
  }

  function deleteTask(currentUser: taskId) {
    axios
      .delete(`${baseURL}/task/${currentUser.id}`)
    setTasks(tasks.filter(i => i.id !== currentUser.id));
    console.log("delete erfolgreich")
  }

  function editTaskForm(id: number, currentTask: taskId) {
    axios
      .put(`${baseURL}/tasks`, currentTask)
      .then((response) => {
        setEdit(false);
      });
  }

  function taskDone(id: number, currentTask: taskId) {
    axios
      .put(`${baseURL}/tasks`, currentTask)
      .then((response) => {
        setTasks(tasks.map(i => (i.id === id ? currentTask : i)));
      });
  }

  if (!tasks) return null;
  return (
    <div className="App">

      <h1></h1>
      <div className="user-flex-wrapper">
        {editing ? (
          <EditTaskForm
            task={editTask}
            onUpdateTask={editTaskForm}
            setEdit={setEdit}
          />
        ) : (
          <AddTaskForm onAddTask={createTask} />
        )}
        <TaskTable
          tasks={tasks}
          onEdit={onCurrentTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;