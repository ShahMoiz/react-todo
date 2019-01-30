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
    // <MDBBtn onClick={() => { editTaskTable(todos.id) }} color="cyan" disabled={todos.isCompleted}>Edit Todo</MDBBtn>

    //     isComplete(e.target.defaultChecked, todos.id);
    // }} type="checkbox" defaultChecked={todos.isCompleted}
    render() {
        const { todos, editTaskTable, dltTodo, isComplete, editTodo } = this.props;
        return (
            <MDBContainer key={todos.id}>
                <MDBCard className="card-body" style={{ width: "500px", margin: "0 auto", marginTop: "10px", marginBottom: "10px" }}>
                    {
                        (this.state.todoIsEdit) ? <MDBCardTitle>{todos.todoName}</MDBCardTitle> :
                         <MDBInput label="Add Your Todo" value={this.state.todoAddValue} onChange={(e) => this.editTodo(e)} />
                    }
                    {
                        (this.state.todoIsEdit) ? <MDBCardText> {todos.todoAddInfo}</MDBCardText> :

                            <MDBInput value={this.state.todoInfoValue} onChange={(e) => this.addInfo(e)} type="textarea" label="Add Additional Info" rows="2" />
                    }
                    <div className="flex-row">
                    { (this.state.todoIsEdit) ? 
                        <div>
                        <MDBBtn onClick={() => dltTodo(todos.id)} color="danger">Delete Todo</MDBBtn> 
                        <MDBBtn onClick={() => { this.editTaskTable(todos.todoName, todos.todoAddInfo) }} color="cyan" disabled={todos.isCompleted}>Edit Todo</MDBBtn> </div>:
                        <MDBBtn onClick={() => { this.props.editTask(todos.id)
                            this.setState({todoIsEdit: true})
                        }} color="cyan" disabled={todos.isCompleted}>Edit Todo Done</MDBBtn> 
                    }
                        <input onClick={(e) => {
                            isComplete(e.target.defaultChecked);
                        }} type="checkbox" id="cbx" style={{ display: 'none' }} />
                        <label onClick={() => {
                            this.props.getID(todos.id)
                        }} htmlFor="cbx" className="check">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>
                        </label>
                        <span>Is Todo Complete</span>
                    </div>
                </MDBCard>
            </MDBContainer>
        )
    }
}