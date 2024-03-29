import React, {useState} from "react";
import login_Icon from '../assets/login_Icon.png'
import password_icon from '../assets/password.png'
import userName_icon from '../assets/user_name.png'
import Form from 'react-bootstrap/Form';
import './loginCss.css';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
function UserLogin(){
    const [userNameValue,setUserName]=useState(null);
    const [passwordValue,setPassword]=useState(null);
    const [user,setUser]=useState(null);
    const navigate=useNavigate();

    function handleSubmit(event){
        event.preventDefault();

        axios.get("http://localhost:8080/user/"+userNameValue)
            .then((response)=> {
                // setUser(response.data);
                const userData = response.data;
                if(userData.password==passwordValue){
                    navigate("/todoApp");
                    const logindetail={
                        userID:userData.userId
                    }
                    axios.post("http://localhost:8080/UserLoginDetail",logindetail)
                        .then(()=>{

                        })
                        .catch((error)=>{
                            alert(error);
                        });

                }else {
                    Swal.fire({
                        title: "Error",
                        text: "Wrong username or password",
                        icon: "question"
                    });
                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: "Username Error",
                    text: "Please enter correct Username",
                    icon: "question"
                });
            });

    }


    return (
        <div className="container" id="mainContainer">
            <div className="Header">
                <div>
                    <img src={login_Icon} alt=""/>
                </div>
                <div className="Text">LogIn Here</div>
            </div>
            <div className="formContainer">
                <Form id="formLayout" >
                    <Form.Group className="mb-3 formGroupRow" >

                                <div className="image">
                                    <img src={userName_icon} alt="" className="icon1" />
                                </div>
                                <Form.Control onChange={(event)=>setUserName(event.target.value)} type="text" placeholder="Enter Username" id="input"/>

                    </Form.Group>
                    <Form.Group className="mb-3 formGroupRow" controlId="formGroupPassword">
                                <div className="image">
                                    <img src={password_icon} alt="" className="icon2"/>
                                </div>
                                <Form.Control onChange={(event)=>setPassword(event.target.value)}  type="password" placeholder="Enter Password" id="input"/>
                    </Form.Group>

                </Form>
                <Button variant="outline-warning" id="btn"onClick={handleSubmit}>LogIn</Button>{' '}
                <Button variant="outline-warning" id="btn">Sign Up</Button>{' '}

            </div>


        </div>
    );
}

export default UserLogin