import React, { useState } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");

    const addTask = () => {
        if (taskText.trim() === "") return;
        const newTask = {
            id: new Date().toISOString(),
            text: taskText
        };
        setTasks([...tasks, newTask]);
        setTaskText("");
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="App">
            <h1>Список задач</h1>

            <div className="input-container">
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Введите задачу"
                />
                <button onClick={addTask}>Добавить задачу</button>
            </div>

            <div  className="task-list-container" >
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <div key={task.id} className="task-item">
                            <span className="task-text">{task.text}</span>
                            <span className="task-date">{new Date(task.id).toLocaleDateString()}</span>
                            <button onClick={() => deleteTask(task.id)}>Удалить</button>
                        </div>
                    ))
                ) : (
                    <p>Задач нет</p>
                )}
            </div>


        </div>
    );
}

export default App;
