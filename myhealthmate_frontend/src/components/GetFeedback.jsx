import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Table from '../common/Table';
import { errortoast, successtoast } from '../functions/toast';
import Swal from 'sweetalert2';

function GetFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [flag, setFlag] = useState("");
    const [editFeedbackData, setEditFeedbackData] = useState(null);

    useEffect(() => {
        axios.get("/get-feedback")
            .then((response) => {
                if (response.data.status === 200) {
                    setFeedbacks(response.data.data);
                } else {
                    errortoast(response.data.msg);
                }
            });
    }, []);

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
                    data={feedbacks}
                    setflag={setFlag}
                    seteditdata={setEditFeedbackData}
                    handledelete={handleDelete}
                />
            </div>
        </>
    );
}

export default GetFeedback;
