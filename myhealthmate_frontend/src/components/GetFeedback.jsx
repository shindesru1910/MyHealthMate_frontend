import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Table from '../common/Table';
import { errortoast, successtoast } from '../functions/toast';
import Swal from 'sweetalert2';

function GetFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [flag, setFlag] = useState("");
    const [editFeedbackData, setEditFeedbackData] = useState(null);

    useEffect(() => {
        axios.get("/get-feedback")
            .then((response) => {
                if (response.data.status === 200) {
                    setFeedbacks(response.data.data);
                    setFilteredFeedbacks(response.data.data); // Initial set
                } else {
                    errortoast(response.data.msg);
                }
            });
    }, []);

    useEffect(() => {
        // Filter feedbacks based on search query
        const filtered = feedbacks.filter(feedback => {
            const lowercasedQuery = searchQuery.toLowerCase();
            // Extract user details from feedback
            const firstName = feedback.user?.first_name?.toLowerCase() || '';
            const lastName = feedback.user?.last_name?.toLowerCase() || '';
            const createdAt = feedback.created_at?.toLowerCase() || '';

            // Check if any of the fields include the search query
            return firstName.includes(lowercasedQuery) ||
                lastName.includes(lowercasedQuery) ||
                createdAt.includes(lowercasedQuery);
        });
        setFilteredFeedbacks(filtered);
    }, [searchQuery, feedbacks])

    const handleDelete = (feedbackData) => {
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
                formData.append('id', feedbackData.id);
                axios.post("/delete-feedback", formData)
                    .then((response) => {
                        if (response.data.status === 200) {
                            setFeedbacks(feedbacks.filter(feedback => feedback.id !== feedbackData.id));
                            setSearchQuery(""); // Reset search query after deletion
                            Swal.fire('Deleted!', 'Feedback has been deleted.', 'success');
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
                    </div>
                </div>
                <Table
                    title="Feedbacks"
                    column={[
                        { key: "id", label: "ID" },
                        { key: 'user.first_name', label: 'First Name' },
                        { key: 'user.last_name', label: 'Last Name' },
                        { key: 'feedback_text', label: 'Feedback Text' },
                        { key: 'created_at', label: 'Created At' }
                    ]}
                    data_access={['id', 'user.first_name', 'user.last_name', 'feedback_text', 'created_at']}
                    data={filteredFeedbacks} // Use filteredFeedbacks instead of feedbacks
                    setflag={setFlag}
                    seteditdata={setEditFeedbackData}
                    handledelete={handleDelete}
                />
            </div>
        </>
    );
}

export default GetFeedback;
