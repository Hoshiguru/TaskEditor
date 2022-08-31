import React from "react";
import { taskId } from "./TaskModel";

interface IProps {
    tasks: Array<taskId>;
    onEdit: (task: taskId) => void;
    onDelete: (task: taskId) => void;
}

const TaskTable: React.FunctionComponent<IProps> = props => {
    return (
        <div className="task-table">
            <h1>View tasks</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>edit</th>
                        <th>delete</th>
                        <th>Done?</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tasks.length > 0 ? (
                        props.tasks.map(i => (
                            <tr>
                                <td>{i["title"]}</td>
                                <td><button onClick={() => props.onEdit(i)}>edit</button></td>
                                <td><button onClick={() => props.onDelete(i)}>delete</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>no users</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default TaskTable;