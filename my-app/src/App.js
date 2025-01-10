import React, { useState } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState(""); // better newTaskText


    //TODO: Check out useCallback and memoize functions 
    const addTask = () => {
        if (taskText.trim() === "") return; // good decision
        const newTask = {
            id: new Date().toISOString(),
            text: taskText
        };
        setTasks([...tasks, newTask]); // prev ? 
        setTaskText("");
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id)); // prev ? 
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
                            <span className="task-date">{new Date(task.id).toLocaleDateString()}</span> {/* better keep date and id separate, add new field date and work with it instead of id */}
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
