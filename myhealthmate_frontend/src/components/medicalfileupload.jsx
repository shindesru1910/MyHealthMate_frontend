// FileUpload.jsx
import React, { useCallback, useState } from 'react';
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

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*,.pdf', // Add any other file types you want to accept
  });

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully', response.data);
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
    </Container>
  );
};

export default FileUpload;
