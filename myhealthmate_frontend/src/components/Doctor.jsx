import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorManagement from './DoctorManagement';
import { ToastContainer } from 'react-toastify';
import Table from '../common/Table';
import { errortoast, successtoast } from '../functions/toast';
import Swal from 'sweetalert2';

function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [flag, setFlag] = useState("");

  useEffect(() => {
    axios.get("/get-doctor")
      .then((response) => {
        if (response.data.status === 200) {
          setDoctors(response.data.data);
        } else {
          errortoast(response.data.msg);
        }
      });
  }, []);

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
            window.location.reload();
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
            window.location.reload();
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
              setModalShow(false);
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              window.location.reload();
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
        <DoctorManagement
          show={modalShow}
          onHide={() => setModalShow(false)}
          handlesave={handleSave}
          flag={flag}
        />
      )}
      <div className="container mt-2">
        <button className='btn btn-primary float-end' onClick={() => { setFlag("add"); setEditUserData(null); setModalShow(true); }}>
          <i className="bi bi-plus-lg me-1"></i>Add Doctor
        </button>
      </div>
      <Table
        title="Doctors"
        column={[
          { key: "first_name", lable: "First Name" },
          { key: 'last_name', lable: 'Last Name' },
          { key: 'specialty', lable: 'Specialty' },
          { key: "contact_info", lable: "Phone" },
          { key: "reviews", lable: "Reviews" },
          { key: "location", lable: "Location" }
        ]}
        data_access={['first_name', 'last_name', 'specialty', 'contact_info', 'reviews', 'location']}
        data={doctors}
        setflag={setFlag}
        setmodalshow={setModalShow}
        seteditdata={setEditUserData}
        handledelete={handleDelete}
      />
    </>
  );
}

export default Doctor;
