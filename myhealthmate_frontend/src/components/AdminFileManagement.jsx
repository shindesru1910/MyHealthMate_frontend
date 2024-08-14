// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './AdminFileManagement.css'; // Import custom CSS for styling

// const AdminFileManagement = () => {
//     const [files, setFiles] = useState([]);

//     useEffect(() => {
//         const fetchFiles = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8000/files/");
//                 setFiles(response.data);
//             } catch (error) {
//                 console.error("There was an error fetching the files!", error);
//             }
//         };

//         fetchFiles();
//     }, []);

//     const handleDownload = (filename) => {
//         window.location.href = `http://localhost:8000/download/${filename}`;
//     };

//     const handleDelete = async (filename) => {
//         try {
//             await axios.delete(`http://localhost:8000/delete/${filename}`);
//             setFiles(files.filter((file) => file.filename !== filename));
//             alert("File deleted successfully!");
//         } catch (error) {
//             console.error("There was an error deleting the file!", error);
//         }
//     };

//     return (
//         <div className="admin-file-management">
//             <h2 className="heading">Uploaded Files</h2>
//             <table className="table">
//                 <thead className="table-dark">
//                     <tr>
//                         <th>#</th>
//                         <th>Filename</th>
//                         <th>Uploaded By</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {files.map((file, index) => (
//                         <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>{file.filename}</td>
//                             <td>{file.username}</td>
//                             <td>
//                                 <div className="button-group">
//                                     <button
//                                         className="cssbuttons-io-button"
//                                         onClick={() => handleDownload(file.filename)}
//                                     >
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             viewBox="0 0 24 24"
//                                             width="24"
//                                             height="24"
//                                         >
//                                             <path fill="none" d="M0 0h24v24H0z"></path>
//                                             <path
//                                                 fill="currentColor"
//                                                 d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z"
//                                             ></path>
//                                         </svg>
//                                         <span>Download</span>
//                                     </button>
//                                     <button
//                                         className="cssbuttons-io-button delete-btn"
//                                         onClick={() => handleDelete(file.filename)}
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminFileManagement;
import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminFileManagement.css'; // Import custom CSS for styling

const AdminFileManagement = () => {
    const [files, setFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

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

    const handleDelete = async (filename) => {
        try {
            await axios.delete(`http://localhost:8000/delete/${filename}`);
            setFiles(files.filter((file) => file.filename !== filename));
            alert("File deleted successfully!");
        } catch (error) {
            console.error("There was an error deleting the file!", error);
        }
    };

    // Filter files based on search query across all relevant fields
    const filteredFiles = files.filter(file => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const fileNameMatch = file.filename.toLowerCase().includes(lowerCaseQuery);
        const userNameMatch = file.username.toLowerCase().includes(lowerCaseQuery);
        const uploadDateMatch = file.upload_date
            ? file.upload_date.toLowerCase().includes(lowerCaseQuery)
            : false; // Handle cases where upload_date is undefined

        return fileNameMatch || userNameMatch || uploadDateMatch;
    });

    return (
        <div className="admin-file-management">
            <h2 className="heading">Uploaded Files</h2>
            {/* Search Bar positioned to the right */}
            <div className="input-group search-bar-right">
                <div className="form-outline">
                    <input
                        type="search"
                        id="form1"
                        className="form-control"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                        placeholder="Search by filename or uploaded by"
                    />
                </div>
                <button type="button" className="btn btn-primary">
                    <i className="fas fa-search"></i>
                </button>
            </div>

            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Filename</th>
                        <th>Uploaded By</th>
                        <th>Upload Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFiles.map((file, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{file.filename}</td>
                            <td>{file.username}</td>
                            <td>{file.upload_date}</td>
                            <td>
                                <div className="button-group">
                                    <button
                                        className="cssbuttons-io-button"
                                        onClick={() => handleDownload(file.filename)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                        >
                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                            <path
                                                fill="currentColor"
                                                d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z"
                                            ></path>
                                        </svg>
                                        <span>Download</span>
                                    </button>
                                    <button
                                        className="cssbuttons-io-button delete-btn"
                                        onClick={() => handleDelete(file.filename)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminFileManagement;
