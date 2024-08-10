// UserMedicalFiles.jsx
//user's medical files for Admin
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserFiles = () => {
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const response = await axios.get('get-user-files'); 
        setUserFiles(response.data);
      } catch (error) {
        console.error('Error fetching user files', error);
      }
    };

    fetchUserFiles();
  }, []);

  return (
    <div>
      <h1>Health Reports</h1>
      <ul>
        {userFiles.map((file) => (
          <li key={file.id}>
            <h2>{file.user.first_name} {file.user.last_name}</h2>
            <ul>
              <li key={file.file}>
                <a href={file.file} target="_blank" rel="noopener noreferrer">
                  {file.file.split('/').pop()}
                </a>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFiles;

