import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const FileUpload2 = () => {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Assuming the JWT token is stored in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.username);
        }
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("username", username); // Include the username in the form data

        try {
            const response = await axios.post("http://localhost:8000/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("There was an error uploading the file!", error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
};

export default FileUpload2;
