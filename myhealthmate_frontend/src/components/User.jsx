import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserManagement from './UserManagement';
import { ToastContainer } from 'react-toastify';
import Table from '../common/Table';
import { errortoast, successtoast } from '../functions/toast';
import Swal from 'sweetalert2';

function User() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [flag, setFlag] = useState("");
    const [editUserData, setEditUserData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get("/get-user")
            .then((response) => {
                if (response.data.status === 200) {
                    setUsers(response.data.data);
                    setFilteredUsers(response.data.data); // Initial set
                } else {
                    errortoast(response.data.msg);
                }
            });
    }, []);

    useEffect(() => {
        // Filter users based on search query
        const filtered = users.filter(user => {
            const lowercasedQuery = searchQuery.toLowerCase();
            return Object.keys(user).some(key => {
                const value = typeof user[key] === 'string' ? user[key].toLowerCase() : '';
                return value.includes(lowercasedQuery);
            });
        });
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

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
                        setSearchQuery(""); // Reset search query after adding a user
                    } else {
                        errortoast(response.data.msg);
                    }
                });
        } else {
            formData.append('id', userData.id);
            axios.post("/update-user", formData)
                .then((response) => {
                    if (response.data.status === 200) {
                        setModalShow(false);
                        setUsers(users.map(user => user.id === userData.id ? userData : user));
                        setSearchQuery(""); // Reset search query after updating a user
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
                            setSearchQuery(""); // Reset search query after deletion
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2></h2>
                    <div className="d-flex align-items-center">
                        <div className="input-group me-3">
                            <div className="form-outline" data-mdb-input-init>
                                <input 
                                    type="search" 
                                    id="form1" 
                                    className="form-control me-4" 
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {/* <label className="form-label" htmlFor="form1">Search</label> */}
                            </div>
                            {/* <button type="button" className="btn btn-primary ms-3" data-mdb-ripple-init>
                                <i className="fas fa-search"></i>
                            </button> */}
                        </div>
                        <button className='btn btn-primary' onClick={() => { setFlag("add"); setEditUserData(null); setModalShow(true); }}>
                            <i className="bi bi-plus-lg me-1"></i>Add User
                        </button>
                    </div>
                </div>
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
                data={filteredUsers} // Use filteredUsers instead of users
                setflag={setFlag}
                setmodalshow={setModalShow}
                seteditdata={setEditUserData}
                handledelete={handleDelete}
            />
        </>
    );
}

export default User;
