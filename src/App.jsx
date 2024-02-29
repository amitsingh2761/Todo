import { useState ,useEffect} from 'react'

import './App.css'
import { TodoProvider } from './contexts/TodoContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { v4 as uuid } from 'uuid';

function App() {
  const [todos, setTodos] = useState([])

const addTodo=(todo)=>{
 
  // setTodos([{id:Date.now,...todo},...todos])  or
  setTodos((prevTodos)=>[{id:uuid(),...todo},...prevTodos])
 
}
const updateTodo=(id,todo)=>{
setTodos((prevTodos)=>prevTodos.map((item)=>{
return item.id===id ? todo :item
}))
}

const deleteTodo = (id) => {
  setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
}



const toggleComplete=(id)=>{
setTodos((prevTodos)=>prevTodos.map((item)=>{return item.id===id?{...item,completed:!item.completed}:
item}))
}



useEffect(()=>{
 const todos= JSON.parse(localStorage.getItem("todos"))
 if(todos&&todos.length>0)
{
  setTodos(todos)
}

},[])

//we can have multiple useEffect
useEffect(()=>{
 localStorage.setItem("todos",JSON.stringify(todos))

},[todos])

  return (

 <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>

<div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
           <TodoForm/>
        </div>
        <div className="flex flex-wrap gap-y-3">
        {
          todos.map((todo)=>(<div key={todo.id} className='w-full'>
<TodoItem todo={todo}/>
          </div>))
        }
        </div>
    </div>
</div>

 </TodoProvider>
  )
}

export default App
