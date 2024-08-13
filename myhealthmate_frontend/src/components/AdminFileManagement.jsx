import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminFileManagement = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get("http://localhost:8000/files/");
                setFiles(response.data);
            } catch (error) {
                console.error("There was an error fetching the files!", error);
            }
        };

        fetchFiles();
    }, []);

    const handleDownload = (filename) => {
        window.location.href = `http://localhost:8000/download/${filename}`;
    };

    return (
        <div>
            <h2>Uploaded Files</h2>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        {file.username} uploaded {file.filename}{" "}
                        <button onClick={() => handleDownload(file.filename)}>Download</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminFileManagement;
