import Navbar from "./components/Navbar";
import "./App.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);


  useEffect(() => {
    let todoString = localStorage.getItem("todolist");
    console.log(todoString);
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todolist")) 
      setTodos(todos)
    }
  },[])

  const saveToLS = (params) => {
    localStorage.setItem("todolist", JSON.stringify(params));
  }
  

  const addTodo = () => {
    if(todo === ""){
      return;
    }
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS([...todos, {id: uuidv4(), todo, isCompleted: false }]);
  };

  const toggleTodo = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const editTodo = (e) => {
    let id = e;
    let index = todos.findIndex(item => item.id === id);
    setTodo(todos[index].todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const deleteTodo = (e) => {
    let id = e;
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const showTodo = () => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="container bg-violet-200 p-4 rounded-lg mx-auto mt-4 min-h-[80vh]">
        <h1 className="font-bold text-center mb-8">iTodo- Your Todo Manager App</h1>
        <div className="flex justify-center items-center p-2">
          <label htmlFor="todo" className="mr-4 font-bold">
            Add Your Todo
          </label>
          <input
            placeholder="Enter your todo here"
            type="text"
            onChange={toggleTodo}
            value={todo}
            className="w-1/4 rounded-md p-1"
          />
          <button
            onClick={addTodo}
            className="bg-violet-900 text-white rounded-md px-3 py-1 mx-4"
          >
            Save
          </button>
          <button
            onClick={showTodo}
            className="bg-violet-900 text-white rounded-md px-3 py-1 pt-1 mx-1"
          >
            Show
          </button>
        </div>

        <h1 className="font-bold text-center">Your Todos</h1>
        <div className="todos my-3 w-full flex flex-col items-center ml-3">
          {todos.length === 0 && <div className="text-center">No Todos to Display. Add More to Continue</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo w-1/2 flex justify-between items-center bg-white p-1 my-2 rounded-md shadow-md">
              <div className="flex gap-4 w-1/2">
              <input className="mt-1" name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id=""/>
              <div className={item.isCompleted?"line-through":""} >{item.todo}</div>
              </div>
              <div className="flex">
                <button
                  onClick={()=>{editTodo(item.id)}}
                  className="bg-violet-900 text-white rounded-md px-3 py-1 mx-2"
                >
                  Edit
                </button>
                <button
                  onClick={()=>{deleteTodo(item.id)}}
                  className="bg-violet-900 text-white rounded-md px-3 py-1 mx-2"
                >
                  Delete
                </button>
              </div>
            </div>;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
