import { useState } from 'react';
import { Check, Edit2, Trash2, X, Save } from 'lucide-react';

function TaskList({ tasks, completeTask, deleteTask, editTask, loading }) {
    const [editingTask, setEditingTask] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const handleEdit = (task) => {
        setEditingTask(task._id);
        setEditTitle(task.title);
    };

    const handleSave = (id) => {
        editTask(id, editTitle);
        setEditingTask(null);
        setEditTitle('');
    };

    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h3>No tasks available</h3>
                <p>Add a new task to get started!</p>
            </div>
        );
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <li key={task._id} className={task.isCompleted ? 'completed' : ''}>
                    {editingTask === task._id ? (
                        <div className="edit-container">
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Edit task"
                                autoFocus
                            />
                            <div className="edit-actions">
                                <button
                                    className="btn-save"
                                    onClick={() => handleSave(task._id)}
                                    disabled={loading || !editTitle.trim()}
                                    title="Save"
                                >
                                    <Save size={18} />
                                </button>
                                <button
                                    className="btn-cancel"
                                    onClick={() => setEditingTask(null)}
                                    disabled={loading}
                                    title="Cancel"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="task-content">
                                {!task.isCompleted && (
                                    <button
                                        className="btn-complete"
                                        onClick={() => completeTask(task._id)}
                                        disabled={loading}
                                        title="Mark as completed"
                                    >
                                        <Check size={18} />
                                    </button>
                                )}
                                <span className="task-title">{task.title}</span>
                            </div>
                            <div className="task-actions">
                                {!task.isCompleted && (
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleEdit(task)}
                                        disabled={loading}
                                        title="Edit task"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                )}
                                <button
                                    className="btn-delete"
                                    onClick={() => deleteTask(task._id)}
                                    disabled={loading}
                                    title="Delete task"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default TaskList;