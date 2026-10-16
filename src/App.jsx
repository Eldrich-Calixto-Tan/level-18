import { useReducer, useState } from 'react';
import { taskReducer, initialTasks, ACTIONS, PRIORITIES } from './taskReducer';
import './App.css';

// ==============================================================================
// 🎮 Quest & Task Manager — Grade 6 Edition
// ==============================================================================
function App() {
  // 1. Centralized State Management with useReducer
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  // 2. Controlled Form Inputs (Local UI State)
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState(PRIORITIES.MEDIUM);

  // 3. Filter Mode ('all' | 'in-progress' | 'completed')
  const [filterMode, setFilterMode] = useState('all');

  // 4. Action Logger: Helps 6th graders inspect state events in real-time
  const [lastAction, setLastAction] = useState({
    type: 'SYSTEM_BOOT',
    payload: { message: 'State machine initialized with initialTasks' },
  });

  // Helper function to dispatch an action and log it for the Code Inspector
  const dispatchAction = (action) => {
    dispatch(action);
    setLastAction(action);
  };

  // Handle task submission
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    dispatchAction({
      type: ACTIONS.ADD_TASK,
      payload: {
        title: taskTitle.trim(),
        priority,
      },
    });

    setTaskTitle('');
    setPriority(PRIORITIES.MEDIUM);
  };

  // Calculate mission progress and statistics
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Filter tasks for display
  const filteredTasks = tasks.filter((task) => {
    if (filterMode === 'in-progress') return !task.completed;
    if (filterMode === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="app-container">
      {/* 🚀 Top Header */}
      <header className="app-header">
        <div className="brand-wrapper">
          <div className="brand-icon">⚡</div>
          <div>
            <h1 className="brand-title">Quest & Task Engine</h1>
            <p className="brand-tagline">Grade 6 Computer Science • Event-Driven useReducer Architecture</p>
          </div>
        </div>

        <div className="header-badges">
          <span className="badge-pill">
            <span className="pulse-dot"></span>
            Pure Reducer Active
          </span>
        </div>
      </header>

      {/* 🔬 Interactive Computer Science Concept Panel */}
      <section className="explainer-card">
        <div className="explainer-header">
          <span className="explainer-title">📐 How useReducer Works (The 3 Core Principles)</span>
          <span className="badge-cs">CS Concept: State Machine</span>
        </div>

        <div className="explainer-steps">
          <div className="step-card">
            <div className="step-badge">Principle 1</div>
            <div className="step-label">💾 Centralized State</div>
            <div className="step-desc">
              All tasks live in one predictable state array instead of scattered variables.
            </div>
          </div>

          <div className="step-card">
            <div className="step-badge">Principle 2</div>
            <div className="step-label">⚡ Structured Actions</div>
            <div className="step-desc">
              Events send clear <code>{'{ type, payload }'}</code> objects describing what happened.
            </div>
          </div>

          <div className="step-card">
            <div className="step-badge">Principle 3</div>
            <div className="step-label">⚙️ Pure Reducer Function</div>
            <div className="step-desc">
              <code>f(state, action) =&gt; newState</code>. Never modifies past state directly (Immutability).
            </div>
          </div>
        </div>

        {/* Live Event Telemetry Bar */}
        <div className="action-inspector">
          <div className="inspector-badge">DISPATCHED ACTION:</div>
          <div className="inspector-details">
            <span className="action-key">type:</span>
            <span className="action-type-value">{lastAction.type}</span>
            <span className="action-key">payload:</span>
            <span className="action-payload-value">
              {JSON.stringify(lastAction.payload)}
            </span>
          </div>
        </div>
      </section>

      {/* 📊 Mission Progress Bar & Stats */}
      <section className="stats-dashboard">
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Total Quests</span>
            <span className="stat-number">{totalCount}</span>
          </div>
          <div className="stat-card active-stat">
            <span className="stat-label">In Progress</span>
            <span className="stat-number">{pendingCount}</span>
          </div>
          <div className="stat-card done-stat">
            <span className="stat-label">Completed</span>
            <span className="stat-number">{completedCount}</span>
          </div>
        </div>

        {/* Visual Progress Meter */}
        <div className="progress-bar-container">
          <div className="progress-info">
            <span>Mission Progress</span>
            <span className="progress-percent">{progressPercent}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </section>

      {/* ✏️ Task Creation Console */}
      <section className="card-section">
        <form onSubmit={handleCreateTask} className="task-creator-form">
          <div className="input-group">
            <input
              id="quest-title-input"
              type="text"
              className="text-input"
              placeholder="Enter new objective or assignment (e.g. Build solar system model 🪐)..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />

            {/* Priority Selector */}
            <div className="priority-selector">
              <span className="priority-label">Priority:</span>
              {Object.values(PRIORITIES).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`priority-chip ${priority === p ? `selected-${p.toLowerCase()}` : ''}`}
                  onClick={() => setPriority(p)}
                >
                  {p === 'High' ? '🔴 High' : p === 'Medium' ? '🟡 Medium' : '🟢 Low'}
                </button>
              ))}
            </div>
          </div>

          <button
            id="add-quest-btn"
            type="submit"
            className="btn-primary"
            disabled={!taskTitle.trim()}
          >
            ➕ Dispatch Task
          </button>
        </form>
      </section>

      {/* 🔍 Filter Controls & Bulk Operations */}
      <div className="filter-row">
        <div className="filter-buttons" role="tablist">
          <button
            type="button"
            className={`filter-btn ${filterMode === 'all' ? 'active' : ''}`}
            onClick={() => setFilterMode('all')}
          >
            All Quests ({totalCount})
          </button>
          <button
            type="button"
            className={`filter-btn ${filterMode === 'in-progress' ? 'active' : ''}`}
            onClick={() => setFilterMode('in-progress')}
          >
            In Progress ({pendingCount})
          </button>
          <button
            type="button"
            className={`filter-btn ${filterMode === 'completed' ? 'active' : ''}`}
            onClick={() => setFilterMode('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>

        <div className="bulk-actions">
          {completedCount > 0 && (
            <button
              type="button"
              className="btn-ghost"
              onClick={() => dispatchAction({ type: ACTIONS.CLEAR_COMPLETED })}
            >
              🧹 Clear Completed
            </button>
          )}
          <button
            type="button"
            className="btn-ghost"
            onClick={() => dispatchAction({ type: ACTIONS.RESET_TASKS })}
          >
            🔄 Reset Dataset
          </button>
        </div>
      </div>

      {/* 📝 Task Log / List */}
      <main className="tasks-list" aria-label="Tasks List">
        {filteredTasks.length === 0 ? (
          <div className="empty-box">
            <span className="empty-emoji">🎯</span>
            <p className="empty-text">No quests in this view</p>
            <p className="empty-subtext">Add a new objective above or switch the filter mode.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`task-row ${task.completed ? 'task-done' : ''}`}
            >
              {/* Status Toggle Button */}
              <button
                type="button"
                className={`check-circle ${task.completed ? 'checked' : ''}`}
                onClick={() => dispatchAction({ type: ACTIONS.TOGGLE_TASK, payload: task.id })}
                aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
              >
                {task.completed ? '✓' : ''}
              </button>

              {/* Task Details */}
              <div
                className="task-details"
                onClick={() => dispatchAction({ type: ACTIONS.TOGGLE_TASK, payload: task.id })}
              >
                <span className="task-title">{task.title}</span>
                <span className={`priority-tag tag-${task.priority.toLowerCase()}`}>
                  {task.priority} Priority
                </span>
              </div>

              {/* Delete Action Button */}
              <button
                type="button"
                className="btn-delete"
                onClick={() => dispatchAction({ type: ACTIONS.DELETE_TASK, payload: task.id })}
                title="Delete quest"
                aria-label="Delete quest"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </main>

      {/* 🛡️ Footer */}
      <footer className="app-footer">
        <span>Level 18 Project • React <code>useReducer</code> State Engine (Grade 6 CS Edition)</span>
      </footer>
    </div>
  );
}

export default App;
