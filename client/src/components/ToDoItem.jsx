import { useState } from "react";

function ToDoItem( { id, task, completed, deleteItem, updateItem, editTask } )
{
  const [updatedTask, setUpdatedTask] = useState(task);  //set update task
  const [editable, setEditable] = useState(false);    //trigger edit 

  return (
    <div className="flex flex-row items-center justify-between mx-10 bg-white rounded-lg p-2 m-2">
        <div className= "max-w-120 ml-5 flex flex-row gap-4">
            <input type="checkbox" onChange={() => {updateItem(id, completed); setEditable(false);}} checked={completed}/>
            {
              editable ? 
              <input 
              type="text" 
              value={updatedTask} 
              onChange={(e) => setUpdatedTask(e.target.value)} 
              onKeyDown={(e) => {if(e.key === "Enter") {editTask(id, updatedTask); setEditable(false);}}} 
              className="text-black text-lg w-120 border border-black rounded-md" 
              placeholder="Enter new task"/> :
              completed ||
              <p className="text-black text-lg w-120 break-words">
              {task}
              </p>
            }
            { 
              completed &&
              <p className="text-black text-lg line-through break-words">{task}</p>
            }
        </div>
        <div className="flex flex-row gap-5 items-end justify-en my-3 mr-4">
            <button 
            className="px-3 py-1 rounded-lg bg-cyan-600 text-black border border-gray-600 cursor-pointer hover:bg-gray-600 disabled:bg-gray-700"
            onClick={() => setEditable(true)} disabled={completed}>
            Edit
            </button>
            <button 
            className="px-3 py-1 rounded-lg bg-red-700 text-black border border-gray-600 cursor-pointer hover:bg-gray-600"
            onClick={() => deleteItem(id)}>
            Delete
            </button>
        </div>
    </div>
  )
}

export default ToDoItem