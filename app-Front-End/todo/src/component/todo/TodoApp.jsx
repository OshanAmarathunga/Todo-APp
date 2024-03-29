import React, {useEffect, useState} from "react";
import './todoApp.css'
import note_icon from '../assets/note_icon.png';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

function TodoApp(){
    const [tasks,setTasks]=useState(null);
    const [titleValue,setTitle]=useState("");
    const [descriptionValue,setDescription]=useState("");
    const [latestUserId,setLatestUserId]=useState("");
    const [update,setUpdate]=useState(null);
    const [taskId,setTaskId]=useState(null);

    useEffect(loadTable,[]);

    function handleAddButton(event){
        event.preventDefault();

        axios.get("http://localhost:8080/lastUserId")
            .then((res)=>{
                setLatestUserId(res.data);

            })
            .catch((err)=>{
                console.log(err);
            });


            if(titleValue===""){
                Swal.fire("Empty Title !!");
            }else {
                const saveDate = {
                    title: titleValue,
                    description: descriptionValue,
                    userId: latestUserId
                }
                axios.post("http://localhost:8080/task", saveDate)
                    .then((res) => {
                        loadTable();
                        setTitle("");
                        setDescription("");
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            title: "Error",
                            text: "Saving Error",
                            icon: "question"
                        });
                    });
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

    function handleUpdate(){
        const updatedDetail= {
            title:titleValue,
            description:descriptionValue,
            userId:latestUserId
        }

        axios.put("http://localhost:8080/task/"+taskId,updatedDetail)
            .then(()=>{
                Swal.fire("Updated !");
                loadTable();
                setUpdate(null);
                setTitle("");
                setDescription("");
            })
            .catch((error)=>{
                alert(error);
            })
    }




    return(
        <div className="container" id="mainContainer2">
            <div className="HeaderSection">
                <div >
                    <img src={note_icon} alt="" id="noteIcon"/>
                </div>
                <div id="headerText">To-Do List</div>
            </div>
            {!update &&
            <div className="container" id="appBody">
                <div id="titleBar">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default"> Title</InputGroup.Text>
                        <Form.Control value={titleValue} onChange={(event)=>setTitle(event.target.value)} aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                    </InputGroup>
                </div>
                <div id="descriptionBar">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default"> Description</InputGroup.Text>
                        <Form.Control value={descriptionValue} onChange={(event)=>setDescription(event.target.value)} aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                    </InputGroup>
                </div>
                <div>
                    <Button variant="warning" id="addBtn" onClick={handleAddButton}>Add</Button>{' '}
                </div>

            </div>
            }

            {update &&
                <div className="container" id="appBody">
                    <div id="titleBar">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default"> Title</InputGroup.Text>
                            <Form.Control value={titleValue} onChange={(event) => setTitle(event.target.value)}
                                          aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                        </InputGroup>
                    </div>
                    <div id="descriptionBar">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default"> Description</InputGroup.Text>
                            <Form.Control value={descriptionValue}
                                          onChange={(event) => setDescription(event.target.value)} aria-label="Default"
                                          aria-describedby="inputGroup-sizing-default"/>
                        </InputGroup>
                    </div>
                    <div>
                        <Button variant="warning" id="addBtn" onClick={handleUpdate}>Update</Button>{' '}
                    </div>

                </div>
            }


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
                        tasks && tasks.map((eachTask) => (
                            <tr key={eachTask.taskId}>
                                <td id="idColumn">{eachTask.taskId}</td>
                                <td>{eachTask.title}</td>
                                <td>{eachTask.description}</td>
                                <td id="dateColoumn">{moment(eachTask.taskDateTime).format('YYYY-MM-DD')}</td>
                                <td id="buttonRow">
                                    <Button variant="outline-success" id="appButtons" onClick={() => {
                                        setTitle(eachTask.title);
                                        setDescription(eachTask.description);

                                        setUpdate("ok")
                                        setTaskId(eachTask.taskId);


                                    }

                                    }>Update</Button>{' '}
                                    <Button variant="outline-warning" id="appButtons" >Completed</Button>{' '}
                                    <Button variant="outline-danger" id="appButtons" onClick={(event)=>{

                                        event.preventDefault();


                                        Swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Yes, delete it!"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                axios.delete("http://localhost:8080/task/"+eachTask.taskId)
                                                    .then(()=>{
                                                        loadTable();
                                                    })
                                                    .catch();

                                                Swal.fire({
                                                    title: "Deleted!",
                                                    text: "Your file has been deleted.",
                                                    icon: "success"
                                                });

                                            }
                                        });


                                    }}>Delete</Button>{' '}
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