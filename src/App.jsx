import { useEffect, useState } from "react"
import { TodoContextProvider} from "./context"
import { TodoForm, TodoItem } from "./components"

function App() {
  
  const[todos, setTodos] = useState([])

  // Todo is a string and it need to be an object t add on our array of todos
  const addTodo = (todo)=>{
    setTodos((prevTodo)=>{
      return [
              {id:Date.now(), ...todo}, ...prevTodo
            ]
    })
  }

  const updateTodo = (id, todo)=>{
    setTodos((prevTodo)=> prevTodo.map((currObj)=>
    (currObj.id === id)?{...currObj, todo:todo}:currObj
    ))
  }

  const deleteTodo = (id)=>{
    setTodos( (prevTodo) => prevTodo.filter((currObj)=> (currObj.id !== id) ) )
  }

  const toggleCompleted = (id)=>{
    setTodos((prevTodo) => prevTodo.map((currObj)=> 
    (currObj.id === id ? {...currObj, completed: !currObj.completed } : currObj )
    ))
  }

  //access value from localStorage and set when page reloads
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length>0){
      setTodos(todos)
    }
  }, [])

  //localstorage setvalues in format where both key and value are in string format
  // set value in localStorage whenever todos changed
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos) )
  }, [todos])

  return (
        <TodoContextProvider 
          value={{todos, addTodo, deleteTodo, updateTodo, toggleCompleted}}>
          <div className="bg-[#172842] min-h-screen py-8">
              <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                  <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                  <div className="mb-4">
                      {/* Todo form goes here */} 
                      <TodoForm/>
                  </div>
                  <div className="flex flex-wrap gap-y-3">
                      {/*Loop and Add TodoItem here */}
                      {todos.map((todo)=>(
                        <div key={todo.id}
                          className="w-full ">
                            <TodoItem todo={todo}/>
                        </div>
                      ))}

                  </div>
              </div>
          </div>
          </TodoContextProvider>
  )
}

export default App
