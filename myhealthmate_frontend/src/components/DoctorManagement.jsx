import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

function DoctorManagement(props) {
    const { onHide, flag, handlesave } = props;

    const InitialState = flag === 'edit' && localStorage.getItem("editDoctorData")
        ? JSON.parse(localStorage.getItem("editDoctorData"))
        : { first_name: '', last_name: '', specialty: '', contact_info: '', reviews: '', location: '' };

    const [doctorData, setDoctorData] = useState(InitialState);

    useEffect(() => {
        if (flag === 'edit' && localStorage.getItem("editDoctorData")) {
            const editData = JSON.parse(localStorage.getItem("editDoctorData"));
            setDoctorData(editData);
        }
    }, [flag]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData(prev => ({ ...prev, [name]: value }));
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
                    {flag === 'add' ? 'Add Doctor' : 'Edit Doctor'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="first_name" className="form-control" value={doctorData.first_name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="last_name" className="form-control" value={doctorData.last_name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Specialty</label>
                        <input type="text" name="specialty" className="form-control" value={doctorData.specialty} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Contact Info</label>
                        <input type="text" name="contact_info" className="form-control" value={doctorData.contact_info} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Reviews</label>
                        <input type="text" name="reviews" className="form-control" value={doctorData.reviews} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" name="location" className="form-control" value={doctorData.location} onChange={handleChange} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button onClick={() => handlesave(doctorData)}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DoctorManagement;
