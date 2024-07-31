import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import { errortoast, successtoast } from '../functions/toast';

function UserManagement(props) {
    const { onHide, flag, handlesave, userData } = props;

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        date_of_birth: '',
        gender: '',
        weight: '',
        height: '',
        activity_level: '',
        dietary_preferences: '',
        health_conditions: '',
        medical_history: '',
        health_goals: '',
        membership_status: ''
    });

    useEffect(() => {
        if (flag === 'edit' && userData) {
            setFormData(userData);
        }
    }, [flag, userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Modal
            {...props}
            size="lg"
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {flag === 'add' ? 'Add User' : 'Edit User'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    {Object.keys(formData).map((key) => (
                        <div className="form-group" key={key}>
                            <label>{key.replace('_', ' ').toUpperCase()}</label>
                            <input
                                type="text"
                                name={key}
                                className="form-control"
                                value={formData[key]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button onClick={() => handlesave(formData)}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserManagement;