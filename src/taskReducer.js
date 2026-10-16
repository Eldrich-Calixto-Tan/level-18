// ==============================================================================
// 🚀 LEVEL 18: React useReducer — Grade 6 Computer Science Edition
// ==============================================================================
// In middle school computer science, we think of useReducer like an
// EVENT-DRIVEN STATE MACHINE (like a Game Engine or Mission Control):
//
// 1. 💾 STATE: The current memory data (e.g., our Quest Log / Task List).
// 2. ⚡ ACTION: An event object sent when something happens: { type, payload }.
// 3. 📡 DISPATCH: The messenger that delivers the action to the reducer.
// 4. ⚙️ REDUCER: A PURE FUNCTION: (currentState, action) => newState.
//    - "Pure" means it never mutates the original data directly.
//    - It calculates and returns a fresh, updated copy of the state.
// ==============================================================================

// 🏷️ Action Types: Using constants prevents spelling bugs in our code!
export const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  RESET_TASKS: 'RESET_TASKS',
};

// 🎯 Available Priority Levels for Grade 6 task planning
export const PRIORITIES = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

// 📋 Initial Sample Tasks (Starter dataset)
export const initialTasks = [
  { id: 1, title: 'Finish Science Lab report 🔬', priority: 'High', completed: false },
  { id: 2, title: 'Practice Math equations (Algebra) 📐', priority: 'Medium', completed: true },
  { id: 3, title: 'Robotics club project presentation 🤖', priority: 'High', completed: false },
  { id: 4, title: 'Read Chapter 4 of History book 📖', priority: 'Low', completed: false },
];

/**
 * ⚙️ The Reducer Function
 * @param {Array} tasks - Current state (immutable list of tasks)
 * @param {Object} action - Event object containing { type, payload }
 * @returns {Array} The newly calculated state
 */
export function taskReducer(tasks, action) {
  switch (action.type) {
    // ➕ ADD_TASK: Create a new task object and prepend to array using the spread operator [...]
    case ACTIONS.ADD_TASK: {
      const { title, priority } = action.payload;

      const newTask = {
        id: Date.now(), // Unique timestamp ID
        title: title.trim(),
        priority: priority || PRIORITIES.MEDIUM,
        completed: false,
      };

      // Immutable array update: [new item, ...existing items]
      return [newTask, ...tasks];
    }

    // ✅ TOGGLE_TASK: Map through the array and flip 'completed' for the matching ID
    case ACTIONS.TOGGLE_TASK: {
      const targetId = action.payload;
      return tasks.map((task) =>
        task.id === targetId
          ? { ...task, completed: !task.completed } // Return a new copy with toggled status
          : task // Return untouched item
      );
    }

    // 🗑️ DELETE_TASK: Filter out the item matching the target ID
    case ACTIONS.DELETE_TASK: {
      const targetId = action.payload;
      return tasks.filter((task) => task.id !== targetId);
    }

    // 🧹 CLEAR_COMPLETED: Filter out all items where completed === true
    case ACTIONS.CLEAR_COMPLETED: {
      return tasks.filter((task) => !task.completed);
    }

    // 🔄 RESET_TASKS: Restore the original initial state
    case ACTIONS.RESET_TASKS: {
      return initialTasks;
    }

    // Default case: If an unknown action occurs, return the current state unchanged
    default:
      return tasks;
  }
}