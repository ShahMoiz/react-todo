import React, { Component } from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer,MDBBtn, Input, FormInline } from "mdbreact";

import './table.css'
export default class AddTodo extends Component {
    // editTaskChild = (id) => {

    //     this.props.editTaskTable(id)
    // }
    render() {
        const { todos, editTaskTable,dltTodo,isChecked } = this.props;
        return (
                <MDBContainer key={todos.id}>
                    <MDBCard className="card-body" style={{ width: "500px", margin: "0 auto", marginTop: "10px", marginBottom: "10px" }}>
                        <MDBCardTitle>{todos.taskName}</MDBCardTitle>
                        <MDBCardText>
                            Add Layout Functionality Coming Soon
                        </MDBCardText>
                        <div className="flex-row">
                            <MDBBtn  onClick={() => dltTodo(todos.id)} color="danger">Delete Todo</MDBBtn>
                            <MDBBtn onClick={() => { editTaskTable(todos.id) }} color="cyan" disabled={todos.isCompleted}>Edit Todo</MDBBtn>
                            <input onClick={(e) => {
                                this.props.isComplete(e.target.defaultChecked, todos.id);
                            }} type="checkbox" defaultChecked={todos.isCompleted} id="cbx" style={{display: 'none'}} />
                            <label for="cbx" className="check">
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