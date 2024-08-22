import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserManagement from './UserManagement';
import { ToastContainer } from 'react-toastify';
import Table from '../common/Table';
import { errortoast, successtoast } from '../functions/toast';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
                        setSearchQuery("");
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
                        setSearchQuery("");
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
                            setSearchQuery("");
                            Swal.fire('Deleted!', 'User has been deleted.', 'success');
                        } else {
                            errortoast(response.data.msg);
                        }
                    });
            }
        });
    };

    const downloadPDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape', // Set the PDF orientation to landscape to fit more columns horizontally
            unit: 'pt',
            format: 'A4'
        });

        doc.setFontSize(18);
        doc.text("User Data", 40, 30); // Adjust the position of the title

        const tableColumn = [
            'First Name', 'Last Name', 'Phone', 'Email', 'Date of Birth',
            'Gender', 'Weight', 'Height', 'Activity Level',
            'Dietary Preferences', 'Health Conditions',
            'Medical History', 'Health Goals', 'Membership Status'
        ];

        const tableRows = filteredUsers.map(user => [
            user.first_name,
            user.last_name,
            user.phone,
            user.email,
            user.date_of_birth,
            user.gender,
            user.weight,
            user.height,
            user.activity_level,
            user.dietary_preferences,
            user.health_conditions,
            user.medical_history,
            user.health_goals,
            user.membership_status
        ]);

        doc.autoTable({
            startY: 50,
            head: [tableColumn],
            body: tableRows,
            theme: 'striped',
            headStyles: { fillColor: [22, 160, 133] }, // Customize header background color
            alternateRowStyles: { fillColor: [240, 240, 240] }, // Customize alternate row background color
            margin: { top: 40, bottom: 20, left: 10, right: 10 }, // Adjust margins
            styles: { fontSize: 8, cellPadding: 4 }, // Adjust font size and cell padding for better fit
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 'auto' },
                3: { cellWidth: 'auto' },
                4: { cellWidth: 'auto' },
                5: { cellWidth: 'auto' },
                6: { cellWidth: 'auto' },
                7: { cellWidth: 'auto' },
                8: { cellWidth: 'auto' },
                9: { cellWidth: 'auto' },
                10: { cellWidth: 'auto' },
                11: { cellWidth: 'auto' },
                12: { cellWidth: 'auto' }
            },
            didDrawPage: (data) => {
                // Footer with page numbers
                let pageCount = doc.internal.getNumberOfPages();
                for (let i = 1; i <= pageCount; i++) {
                    doc.setPage(i);
                    doc.text(`Page ${i} of ${pageCount}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
                }
            }
        });

        doc.save('user_data.pdf');
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
                            </div>
                            <button type="button" className="btn btn-primary ms-2 mt-0">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                        <button className='btn btn-light' onClick={() => { setFlag("add"); setEditUserData(null); setModalShow(true); }}>
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
                data={filteredUsers}
                setflag={setFlag}
                setmodalshow={setModalShow}
                seteditdata={setEditUserData}
                handledelete={handleDelete}
            />
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-danger" onClick={downloadPDF}>
                    <i className="bi bi-download me-1"></i>Download PDF
                </button>
            </div>
        </>
    );
}

export default User;
