import logo from './logo.svg';
import './App.css';
import {Button} from "react-bootstrap";
import {BrowserRouter, Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import UserLogin from "./component/login/UserLogin";
import TodoApp from "./component/todo/TodoApp";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserLogin/>}></Route>
                <Route path="/todoApp" element={<TodoApp/>}></Route>
            </Routes>

        </BrowserRouter>


    </div>
  );
}

export default App;
