import React, { useEffect } from 'react'
import { useState } from 'react'
import Task from './Task'

const Header = () => {
  let initial_Arr = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')): []
  const [tasks, setTasks] = useState(initial_Arr);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState("")

  function handleClick(e) {
    e.preventDefault()
    if(tasks && description){setTasks([...tasks, {title, description}])
    localStorage.setItem('tasks', JSON.stringify(tasks))
    console.log(title, description, tasks)
    setTitle("");
    setDescription("");}
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function deleteTask(index) {
    const filteredArray = tasks.filter((value, i) => {
      return i!==index
    })
    console.log(filteredArray)
    setTasks(filteredArray)
  }
  return (
    <div className="container">
    <h1>DAILY GOALS</h1>
    <form onSubmit={(e) => handleClick(e)}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button type="submit">ADD</button>
    </form>

    {tasks.map((item, index) => {
      return(
        <Task key={index} title={item.title} deleteTask={deleteTask} index={index} description={item.description} />
      )
    })}
  </div>
  )
}

export default Header