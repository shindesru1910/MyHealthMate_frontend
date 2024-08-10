// // FileUpload.jsx
// //uploading file page by the user

import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #4a4a4a;
  margin-bottom: 20px;
`;

const Dropzone = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed #cccccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cccccc;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    border-color: #999999;
    color: #999999;
  }
`;

const UploadButton = styled.button`
  background-color: #6a1b9a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #4a148c;
  }
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const FileItem = styled.li`
  background-color: #f5f5f5;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button {
    background: none;
    border: none;
    color: red;
    cursor: pointer;
  }
`;

const SuccessMessage = styled.div`
  background-color: #e6ffe6;
  color: #4caf50;
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
  width: 100%;
  text-align: center;
`;


const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [successFiles, setSuccessFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Fetch previously uploadedfiles
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('get-user-files');
      setUploadedFiles(response.data.files);
    } catch (error) {
      console.error('Error fetching uploaded files', error);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain',
  });

  const getCsrfToken = () => {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await axios.post('upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': getCsrfToken(),
        },
      });
      console.log('File uploaded successfully', response.data);
      setSuccessFiles(files.map((file) => file.name));
      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        ...files.map((file) => ({
          name: file.name, url: response.data.file_urls.find((url) => url.includes(file.name))
        }))
      ]);
      setFiles([]);
    } catch (error) {
      console.error('Error uploading file', error);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <Container>
      <Title>Upload</Title>
      <Dropzone {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag & drop files or <span>Browse</span></p>
      </Dropzone>
      <FileList>
        {files.map((file) => (
          <FileItem key={file.name}>
            <span>{file.name}</span>
            <button onClick={() => removeFile(file.name)}>Remove</button>
          </FileItem>
        ))}
      </FileList>
      <UploadButton onClick={handleUpload} disabled={uploading || files.length === 0}>
        {uploading ? 'Uploading...' : 'Upload Files'}
      </UploadButton>
      {successFiles.length > 0 && (
        <SuccessMessage>
          Files uploaded successfully: {successFiles.join(', ')}
        </SuccessMessage>
      )}
      <br />
      <h4>Uploaded Files</h4>
      <FileList>
        {uploadedFiles.map((file) => (
          <FileItem key={file.name}>
            <span>{file.name}</span>
            <a href={file.url} target="_blank" rel="noopener noreferrer">View</a>
          </FileItem>
        ))}
      </FileList>
    </Container>
  );
};

export default FileUpload;

