import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import './FileUpload.css';

const FileUpload2 = () => {
    const [files, setFiles] = useState([]);
    const [username, setUsername] = useState("");
    const [successMessage, setSuccessMessage] = useState("");  
    const [errorMessage, setErrorMessage] = useState("");      

    useEffect(() => {
        // Assuming the JWT token is stored in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.username);
        }
    }, []);

    

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleFileUpload = async () => {
        try {
            setSuccessMessage("");
            setErrorMessage("");

            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("username", username);

                try {
                    const response = await axios.post("http://localhost:8000/upload/", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    // Ensure the response is valid JSON
                    if (response.headers['content-type'].includes('application/json')) {
                        const data = response.data;
                        setSuccessMessage(data.message || "File uploaded successfully!");

                    } else {
                        throw new Error("Response is not JSON");
                    }
                } catch (error) {
                    console.error("Axios error:", error.response || error.message || error);
                    setErrorMessage("Error uploading file. Please check the console for details.");
                }
            }
            setFiles([]); // Clear files after successful upload
        } catch (error) {
            console.error("Error processing files:", error);
            setErrorMessage("Error processing files. Please try again.");
        }
    };

    const handleRemoveFile = (fileToRemove) => {
        setFiles(files.filter(file => file !== fileToRemove));
    };

    return (
        <div className="upload-container">
            <h1>Upload Your Files</h1>
            <div className="upload-box">
                <div className="upload-area">
                    <p>Drag & drop files or <span className="browse-text">Browse</span></p>
                    <input type="file" multiple onChange={handleFileChange} className="file-input" />
                </div>
                {files.length > 0 && (
                    <div className="uploading">
                        <p>Uploading: {files.length} files</p>
                        <div className="file-list">
                            {files.map((file, index) => (
                                <div key={index} className="file-item">
                                    <p>{file.name}</p>
                                    <button onClick={() => handleRemoveFile(file)}>Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <button className="upload-button" onClick={handleFileUpload}>Upload Files</button>
                
                {/* Display messages below the upload button */}
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

            </div>
        </div>
    );
};

export default FileUpload2;
