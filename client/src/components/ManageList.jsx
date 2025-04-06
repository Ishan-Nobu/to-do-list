import { useState, useEffect } from "react"
import axios from "axios"
import ToDoItem from "./ToDoItem"

const BASE_API = 'http://localhost:3300/todo';

function ManageList() 
{
  const [inputVal, setInputVal] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();    // fetch items on intial render
  }, []);

  const getItems = async() => {
    await axios.get(BASE_API)     // fetch items
    .then(result => setItems(result.data))
    .catch(err => console.log(err));
  }
  
  // add items / create tasks
  const addItems = async() => {
    await axios.post(BASE_API + '/new', {
      task: inputVal,
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(result => result.data) 
    getItems();
    setInputVal("");
  };
  
  // delete items/tasks
  const deleteItem = async(id) => {
    await axios.delete(BASE_API + '/delete/' + id)
    .then(result => {
      const updatedItems = items.filter(item => item._id !== id);
      setItems(updatedItems);                    
    })
    .catch(err => console.log(err));
  }

  // toggle completed/not completed on tasks/items
  const updateItem =  async(id, completed) => {
    await axios.put(BASE_API + '/update/' + id, {completed: !completed})
    .then(result => {
      const updatedItems = items.map(item => {
        if(item._id === id)
        {
          return {...item, completed: !item.completed}
        }
        return item;
      })
      setItems(updatedItems);
    })
    .catch(err => console.log(err));
  }

  // edit tasks
  const editTask = async(id, updatedTask) => {
    await axios.put(BASE_API + '/edit/' + id, { task: updatedTask })
    .then(result => {
      const updatedItems = items.map(item => {
        if(item._id === id)
        {
          return {...item, task: updatedTask};
        }
        return item;
      })
      setItems(updatedItems);
    })
    .catch(err => console.log(err));
  }

  return (
    <>
    <div className="flex flex-row items-center justify-center gap-6">
      <input
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        placeholder="Enter Task"
        className="w-150 px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none" />
      <button
        onClick={addItems}
        className="px-3 py-2 rounded-lg bg-purple-700 text-white border border-gray-600 cursor-pointer hover:bg-gray-600 ease-in-out">
        Add
      </button>
    </div>
    <div className="w-200 flex flex-col m-auto text-white rounded-lg">
      { 
        items.length === 0 ? <div className='m-auto w-170 text-5xl font-bold p-5 bg-white text-black rounded-lg text-center'>No tasks found</div> :
        items.map(( { _id, task, completed } ) => (
          <ToDoItem key={_id} id={_id} task={task} completed={completed} deleteItem={deleteItem} updateItem={updateItem} editTask={editTask}/>
        ))
      }
    </div>
    </>
  )
}

export default ManageList