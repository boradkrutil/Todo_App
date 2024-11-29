// import logo from './logo.svg';
import { Button, Input } from "antd";
import {
  CheckCircleFilled,
  DeleteFilled,
  EditOutlined,
} from "@ant-design/icons";
import "./App.css";
import Header from "./components/Header";
import { useState } from "react";
import user from "./helper/users";

function App() {
  const [todo, setTodo] = useState({
    id: Math.random() * 100,
    title: "",
    user: "",
    compleated: false,
  });
  const [todolist, setTodolist] = useState([]);
  const [editClicl, setEditClicl] = useState(false);
  const [update, setUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const onchangeHandler = (e) => {
    let { name, value } = e.target;
    setTodo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //Add TodoList

  const sumbitHandler = () => {
    // if (!todo.trim()) return;
    setTodolist([...todolist, todo]);
    setTodo({
      id: Math.random() * 100,
      title: "",
      user: "",
      compleated: false,
    });
  };

  //Delete todolist
  const deleteHandler = (i) => {
    const newList = data.filter((_, index) => i !== index);
    setTodolist(newList);
  };

  //update or edit Todolist

  const EditHandler = (i) => {
    setEditClicl(true);
    setTodo(todolist[i]);
    setUpdate(i);
  };

  const updateHandler = () => {
    const New = [...todolist];
    New[update] = todo;
    setTodolist(New);
    setEditClicl(false);
    setUpdate(null);
    setTodo({
      id: Math.random() * 100,
      title: "",
      user: "",
      compleated: false,
    });
  };

  //Toggle Completion Status
  const toggleCompletion = (i) => {
    const updatedList = todolist.map((item, index) =>
      index === i
        ? { ...item, compleated: !item.compleated } // Toggle the `compleated` property
        : item
    );
    setTodolist(updatedList);
  };

  //Search for items in the list
  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const filteredTodos = todolist.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const data = todolist;

  return (
    <>
      <Header />
      <div className="container bg-fuchsia-200 mx-auto mt-7 p-3 rounded min-h-[80vh]">
        <div className="addTodo my-4">
          <h1 className="text-2xl text-center py-1">Add Todo</h1>

          <div className="searchTodo my-4">
            <h2 className="text-xl">Search Todos:</h2>
            <Input
              type="text"
              placeholder="Search by title or user"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-2 my-2 border rounded"
            />
          </div>

          <div className="flex justify-between gap-2">
            <Input
              type="text"
              className="text-md outline-none"
              placeholder="Enter Todo"
              name="title"
              onChange={onchangeHandler}
              value={todo.title}
            />
            <select
              value={todo.user}
              name="user"
              required
              onChange={onchangeHandler}
              className="p-2 bg-slate-100 border rounded"
            >
              <option value={""}>Select User</option>

              {user.map((el, index) => {
                return (
                  <option value={el.value} key={index}>
                    {el.name}
                  </option>
                );
              })}
            </select>
            {editClicl ? (
              <Button
                onClick={updateHandler}
                className="add p-4 text-lg bg-violet-700 font-bold transition-all text-white mx-2"
              >
                update
              </Button>
            ) : (
              <Button
                onClick={sumbitHandler}
                className="add p-4 text-lg bg-violet-700 font-bold transition-all text-white mx-2"
              >
                Add
              </Button>
            )}
          </div>
        </div>
        <div className="Todolist">
          <h2 className="text-xl underline">Todo Lists :</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">User</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.title}</td>
                    <td>{item.user}</td>
                    <td>
                      {" "}
                      {item.compleated ? "Completed" : "Not Completed"}
                      <button
                        onClick={() => toggleCompletion(i)}
                        className={
                          item.compleated
                            ? "btn-success ml-2 p-1 rounded-full"
                            : "btn-danger ml-2 p-1 rounded-full"
                        }
                      >
                        <CheckCircleFilled />
                      </button>
                    </td>
                    <td>
                      <span>
                        <Button onClick={() => EditHandler(i)}>
                          <EditOutlined />
                        </Button>
                        <Button onClick={() => deleteHandler(i)}>
                          <DeleteFilled />
                        </Button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}

export default App;
