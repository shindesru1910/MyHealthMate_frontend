// UserMedicalFiles.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserFiles = () => {
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const response = await axios.get('get-user-files');
        setUserFiles(response.data.user_files);
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
        {userFiles.map((user) => (
          <li key={user.username}>
            <h2>{user.username}</h2>
            <ul>
              {user.files.map((file) => (
                <li key={file.name}>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    {file.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFiles;
