import React, { Component } from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer, MDBBtn, MDBInput } from "mdbreact";

import './table.css'
export default class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCompleted: false,
            todoIsEdit: true,
            todoAddValue: '',
            todoInfoValue: '',
        }
    }

    toggleDisable = () => {

    }
    editTaskTable = (addValue, infoValue) => {
        const toggle = !this.state.todoIsEdit;
        this.setState({ todoIsEdit: toggle, todoAddValue: addValue, todoInfoValue: infoValue });
    }
    editTodo = (e) => {
        this.props.editTodo(e);
        this.setState({ todoAddValue: e.target.value })
    }
    addInfo = (e) => {
        this.props.addInfo(e);
        this.setState({ todoInfoValue: e.target.value })
    }
    render() {
        const { todos, editTaskTable, dltTodo, isComplete, editTodo } = this.props;
        return (
            <MDBContainer key={todos.id}>
                <MDBCard className="card-body" style={{ width: "500px", margin: "0 auto", marginTop: "10px", marginBottom: "10px" }}>
                    {
                        (this.state.todoIsEdit) ? <div>
                            <MDBCardTitle>{todos.todoName}</MDBCardTitle>
                            <MDBCardText> {todos.todoAddInfo}</MDBCardText>
                            <div className="flex-row">
                                <MDBBtn onClick={() => dltTodo(todos.id)} color="danger">Delete Todo</MDBBtn>
                                <MDBBtn onClick={() => { this.editTaskTable(todos.todoName, todos.todoAddInfo) }} color="cyan" disabled={todos.isCompleted}>Edit Todo</MDBBtn> </div>
                            
                                <label className="check">
                                    <input type="checkbox" onClick={() => isComplete(todos.id)} checked={todos.isCompleted} />
                                    <div className="box"></div>
                                </label>
                            <span>Is Todo Complete</span>
                        </div> :
                            <div>
                                <MDBInput label="Add Your Todo" value={this.state.todoAddValue} onChange={(e) => this.editTodo(e)} />
                                <MDBInput value={this.state.todoInfoValue} onChange={(e) => this.addInfo(e)} type="textarea" label="Add Additional Info" rows="2" />
                                <MDBBtn onClick={() => {
                                    this.props.editTask(todos.id)
                                    this.setState({ todoIsEdit: true })
                                }} color="cyan" disabled={todos.isCompleted}>Edit Todo Done</MDBBtn>
                            </div>
                    }
                    
                    {/* </div> */}
                </MDBCard>
            </MDBContainer>
        )
    }
}