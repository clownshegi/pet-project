import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import './index.css';


function App() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTaskText, setNewTaskText] = useState("");

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = useCallback(() => {
        if (newTaskText.trim() === "") return;
        const newTask = {
            id: crypto.randomUUID(),
            text: newTaskText,
            date: new Date().toISOString()
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setNewTaskText("");
    }, [newTaskText]);

    const copyTask = useCallback((id) => {
        const taskToCopy = tasks.find((task) => task.id === id);
        if (taskToCopy) {
            const copyNumber = tasks.filter((task) =>
                task.text.startsWith(`${taskToCopy.text} (Копия`)
            ).length + 1;

            const copiedTask = {
                ...taskToCopy,
                id: crypto.randomUUID(),
                text: `${taskToCopy.text} (Копия ${copyNumber})`,
                date: new Date().toISOString(),
            };
            setTasks((prevTasks) => [...prevTasks, copiedTask]);
        }
    }, [tasks]);



    const deleteTask = useCallback((id) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
    }, []);

    return (
        <div className="App">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Список задач</h1>
            <div className="input-container mb-4">
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Введите задачу"
                    className="p-2 border border-gray-300 rounded-lg w-64"
                />
                <button onClick={addTask} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Добавить задачу
                </button>
            </div>

            <div className="task-list-container max-h-80 overflow-y-auto p-4 w-2/3 mx-auto">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <div key={task.id}
                             className="task-item flex justify-between items-center mb-2 p-2 bg-white border border-gray-300 rounded-lg shadow-sm">
                            <span className="task-text text-lg font-semibold  ">{index + 1}. {task.text}</span>
                            <span className="task-date text-sm font-bold text-blue-600 bg-gray-200 py-1 px-2 rounded">Дата создания: {new Date(task.date).toLocaleDateString()}</span>
                            <button onClick={() => copyTask(task.id)}
                                    className="ml-4 bg-green-800 text-white py-1 px-3 rounded hover:bg-green-950">Сделать копию
                            </button>
                            <button onClick={() => deleteTask(task.id)}
                                    className="ml-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Удалить
                            </button>
                        </div>

                    ))
                ) : (
                    <p className="text-gray-500 text-xl">Задач нет</p>
                )}
            </div>
        </div>
    );
}

export default App;
