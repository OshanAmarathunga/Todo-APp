import React, {useEffect, useState} from "react";
import './todoApp.css'
import note_icon from '../assets/note_icon.png';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from "moment";

function TodoApp(){
    const [tasks,setTasks]=useState(null);
    const [titleValue,setTitle]=useState("");
    const [descriptionValue,setDescription]=useState("");

    useEffect(loadTable,[]);

    function handleAddButton(event){
        event.preventDefault();
        const saveDate={
            title:titleValue,
            description:descriptionValue,
            userId:
        }
    }
    function loadTable(){
        axios.get("http://localhost:8080/task")
            .then((response)=>{
                setTasks(response.data);
            })
            .catch((err)=>{
                console.log(err);
            });
    }
    return(
        <div className="container" id="mainContainer2">
            <div className="HeaderSection">
                <div >
                    <img src={note_icon} alt="" id="noteIcon"/>
                </div>
                <div id="headerText">To-Do List</div>
            </div>

            <div className="container" id="appBody">
                <div id="titleBar">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default"> Title</InputGroup.Text>
                        <Form.Control onChange={(event)=>setTitle(event.target.value)} aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                    </InputGroup>
                </div>
                <div id="descriptionBar">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default"> Description</InputGroup.Text>
                        <Form.Control onChange={(event)=>setDescription(event.target.value)} aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                    </InputGroup>
                </div>
                <div>
                    <Button variant="warning" id="addBtn" onClick={handleAddButton}>Add</Button>{' '}
                </div>

            </div>

            <div className="container" id="dataList">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tasks && tasks.map((eachTask)=> (
                            <tr key={eachTask.taskId}>
                                <td id="idColumn">{eachTask.taskId}</td>
                                <td>{eachTask.title}</td>
                                <td>{eachTask.description}</td>
                                <td id="dateColoumn">{moment(eachTask.taskDateTime).format('YYYY-MM-DD')}</td>
                                <td id="buttonRow">
                                    <Button variant="outline-success" id="appButtons">Update</Button>{' '}
                                    <Button variant="outline-warning" id="appButtons">Completed</Button>{' '}
                                    <Button variant="outline-danger" id="appButtons">Delete</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }

                    </tbody>
                </Table>

            </div>


        </div>
    )
}

export default TodoApp