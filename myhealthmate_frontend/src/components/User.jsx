import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserManagement from './UserManagement';
import { ToastContainer } from 'react-toastify';
import Table from '../common/Table';
import { errortoast, successtoast } from '../functions/toast';
import Swal from 'sweetalert2';

function User() {
    const [users, setUsers] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [flag, setFlag] = useState("");
    const [editUserData, setEditUserData] = useState(null);

    useEffect(() => {
        axios.get("/get-user")
            .then((response) => {
                if (response.data.status === 200) {
                    setUsers(response.data.data);
                } else {
                    errortoast(response.data.msg);
                }
            });
    }, []);

    const handleSave = (userData) => {
        let formData = new FormData();
        for (let key in userData) {
            formData.append(key, userData[key]);
        }

        if (flag === 'add') {
            axios.post("/create-user", formData)
                .then((response) => {
                    if (response.data.status === 200) {
                        successtoast(response.data.msg);
                        setModalShow(false);
                        setUsers([...users, response.data.data]);
                    } else {
                        errortoast(response.data.msg);
                    }
                });
        } else {
            formData.append('id', userData.id);
            axios.post("/update-user", formData)
                .then((response) => {
                    if (response.data.status === 200) {
                        successtoast(response.data.msg);
                        setModalShow(false);
                        setUsers(users.map(user => user.id === userData.id ? userData : user));
                    } else {
                        errortoast(response.data.msg);
                    }
                });
        }
    };

    const handleDelete = (userData) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let formData = new FormData();
                formData.append('id', userData.id);
                axios.post("/delete-user", formData)
                    .then((response) => {
                        if (response.data.status === 200) {
                            setUsers(users.filter(user => user.id !== userData.id));
                            Swal.fire('Deleted!', 'User has been deleted.', 'success');
                        } else {
                            errortoast(response.data.msg);
                        }
                    });
            }
        });
    };

    return (
        <>
            <ToastContainer />
            {modalShow && (
                <UserManagement
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    handlesave={handleSave}
                    flag={flag}
                    userData={editUserData}
                />
            )}
            <div className="container mt-2">
                <button className='btn btn-primary float-end' onClick={() => { setFlag("add"); setEditUserData(null); setModalShow(true); }}>
                    <i className="bi bi-plus-lg me-1"></i>Add User
                </button>
            </div>
            <Table
                title="Users"
                column={[
                    { key: "first_name", label: "First Name" },
                    { key: 'last_name', label: 'Last Name' },
                    { key: 'phone', label: 'Phone' },
                    { key: "email", label: "Email" },
                    { key: "date_of_birth", label: "Date of Birth" },
                    { key: "gender", label: "Gender" },
                    { key: "weight", label: "Weight" },
                    { key: "height", label: "Height" },
                    { key: "activity_level", label: "Activity Level" },
                    { key: "dietary_preferences", label: "Dietary Preferences" },
                    { key: "health_conditions", label: "Health Conditions" },
                    { key: "medical_history", label: "Medical History" },
                    { key: "health_goals", label: "Health Goals" },
                    { key: "membership_status", label: "Membership Status" }
                ]}
                data_access={['first_name', 'last_name', 'phone', 'email', 'date_of_birth', 'gender', 'weight', 'height', 'activity_level', 'dietary_preferences', 'health_conditions', 'medical_history', 'health_goals', 'membership_status']}
                data={users}
                setflag={setFlag}
                setmodalshow={setModalShow}
                seteditdata={setEditUserData}
                handledelete={handleDelete}
            />
        </>
    );
}

export default User;