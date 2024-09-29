//User's side of file uploading
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './FileUpload.css';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]); // State for uploaded files
    const [username, setUsername] = useState("");
    const [successMessage, setSuccessMessage] = useState("");  // State for success message
    const [errorMessage, setErrorMessage] = useState("");      // State for error message

    useEffect(() => {
        // Check and decode JWT token
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.username);
            // Fetch uploaded files only after the username is set
            fetchUploadedFiles(decodedToken.username);
        }
    }, []);

    const fetchUploadedFiles = async (username) => {
        try {
            const response = await axios.get("http://localhost:8000/get_uploaded_files/", {
                params: { username } // Send the username to fetch user's files
            });
            if (response.headers['content-type'].includes('application/json')) {
                setUploadedFiles(response.data.files); // Assuming the response contains a `files` array
            }
        } catch (error) {
            console.error("Error fetching uploaded files:", error);
            setErrorMessage("Error fetching uploaded files.");
        }
    };

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

                        // Fetch and display the updated list of uploaded files
                        fetchUploadedFiles(username);
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

                {/* Display the list of uploaded files */}
                {uploadedFiles.length > 0 && (
                    <div className="uploaded-files">
                        <h2>My Uploaded Files</h2>
                        <ul className="file-list">
                            {uploadedFiles.map((file, index) => (
                                <li key={index} className="file-item">
                                    <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="file-link">
                                        {file.filename}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
};

export default FileUpload;
