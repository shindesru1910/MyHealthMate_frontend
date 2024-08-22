import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorManagement from './DoctorManagement';
import { ToastContainer } from 'react-toastify';
import Table from '../common/Table';
import { errortoast, successtoast } from '../functions/toast';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [flag, setFlag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("/get-doctor")
      .then((response) => {
        if (response.data.status === 200) {
          setDoctors(response.data.data);
          setFilteredDoctors(response.data.data); // Initial set
        } else {
          errortoast(response.data.msg);
        }
      });
  }, []);

  useEffect(() => {
    // Filter doctors based on search query
    const filtered = doctors.filter(doctor => {
      const lowercasedQuery = searchQuery.toLowerCase();
      return Object.keys(doctor).some(key => {
        const value = typeof doctor[key] === 'string' ? doctor[key].toLowerCase() : '';
        return value.includes(lowercasedQuery);
      });
    });
    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  const handleSave = (userData) => {
    let formdata = new FormData();
    formdata.append('first_name', userData.first_name);
    formdata.append('last_name', userData.last_name);
    formdata.append('specialty', userData.specialty);
    formdata.append('contact_info', userData.contact_info);
    formdata.append('reviews', userData.reviews);
    formdata.append('location', userData.location);

    if (flag === 'add') {
      axios.post("/create-doctor", formdata)
        .then((response) => {
          if (response.data.status === 200) {
            successtoast(response.data.msg);
            setModalShow(false);
            setDoctors([...doctors, response.data.data]);
            setSearchQuery(""); // Reset search query after adding a doctor
          } else {
            errortoast(response.data.msg);
          }
        });
    } else {
      formdata.append('id', userData.id);
      axios.post("/update-doctor", formdata)
        .then((response) => {
          if (response.status === 200) {
            successtoast(response.data.msg);
            setModalShow(false);
            setDoctors(doctors.map(doctor => doctor.id === userData.id ? userData : doctor));
            setSearchQuery(""); // Reset search query after updating a doctor
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
        let formdata = new FormData();
        formdata.append('id', userData.id);
        axios.post("/delete-doctor", formdata)
          .then((response) => {
            if (response.status === 200) {
              setDoctors(doctors.filter(doctor => doctor.id !== userData.id));
              setSearchQuery(""); // Reset search query after deletion
              Swal.fire('Deleted!', 'Doctor has been deleted.', 'success');
            } else {
              errortoast(response.data.msg);
            }
          });
      }
    });
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Doctors List", 20, 10);
    doc.autoTable({
      startY: 20,
      head: [['First Name', 'Last Name', 'Specialty', 'Phone', 'Reviews', 'Location']],
      body: filteredDoctors.map(doctor => [
        doctor.first_name,
        doctor.last_name,
        doctor.specialty,
        doctor.contact_info,
        doctor.reviews,
        doctor.location
      ]),
    });
    doc.save('doctors.pdf');
  };

  return (
    <>
      <ToastContainer />
      {modalShow && (
        <DoctorManagement
          show={modalShow}
          onHide={() => setModalShow(false)}
          handlesave={handleSave}
          flag={flag}
        />
      )}
      <div className="container mt-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2></h2>
          <div className="d-flex align-items-center">
            <div className="input-group me-3">
              <div className="form-outline">
                <input 
                  type="search" 
                  id="search" 
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
              <i className="bi bi-plus-lg me-1"></i>Add Doctor
            </button>
          </div>
        </div>
      </div>
      <Table
        title="Doctors"
        column={[
          { key: "first_name", label: "First Name" },
          { key: 'last_name', label: 'Last Name' },
          { key: 'specialty', label: 'Specialty' },
          { key: "contact_info", label: "Phone" },
          { key: "reviews", label: "Reviews" },
          { key: "location", label: "Location" }
        ]}
        data_access={['first_name', 'last_name', 'specialty', 'contact_info', 'reviews', 'location']}
        data={filteredDoctors} // Use filteredDoctors instead of doctors
        setflag={setFlag}
        setmodalshow={setModalShow}
        seteditdata={setEditUserData}
        handledelete={handleDelete}
      />
      <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-danger" onClick={downloadPdf}>
                    <i className="bi bi-download me-1"></i>Download PDF
                </button>
      </div>
    </>
  );
}

export default Doctor;
