import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ProjectNewPage() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('description', description);
      if (image) {
        formDataToSend.append('image', image);
      }
  
      const response = await fetch(`/projects`, {
        method: 'POST',
        body: formDataToSend
      });
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      navigate('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };


  return (
    <div className="container">
      <h1>Создать новый проект</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Изображение:</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Создать проект</button>
        <Link to="/projects" className="btn btn-secondary">Назад</Link>
      </form>
    </div>
  );
}

export default ProjectNewPage;
