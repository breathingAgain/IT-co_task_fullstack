import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles.css'; 

function ProjectEditPage() {
  const { projectId } = useParams(); 
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    deleteImage: false,
    newImage: null
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/projects/${projectId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        const data = await response.json();
        setProject(data);
        setFormData({
          name: data.name,
          description: data.description,
          image: data.image || null,
          deleteImage: false,
          newImage: null
        });
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [projectId]); 

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = event => {
    const newImageFile = event.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      newImage: newImageFile
    }));
  };

  const handleDeleteImageToggle = () => {
    setFormData(prevState => ({
      ...prevState,
      deleteImage: !prevState.deleteImage
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
  
    if (formData.deleteImage) {
      formDataToSend.append('deleteImage', true);
    }
  
    if (!formData.newImage && !formData.deleteImage && project.image) {
      formDataToSend.append('image', project.image);
    } else if (formData.newImage) {
      formDataToSend.append('image', formData.newImage);
    }
  
    try {
      const response = await fetch(`/projects/${projectId}`, { 
        method: 'PUT',
        body: formDataToSend
      });
      if (!response.ok) {
        throw new Error('Failed to update project');
      }
      navigate('/projects');
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };
  

  return (
    <div className="container">
      <h1>Редактировать проект</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          {formData.image && (
            <img src={formData.image} alt="Current Project" className="img-fluid img-preview" /> 
          )}
        </div>
        <div className="form-group">
          <label htmlFor="newImage">Новое изображение:</label>
          <input
            type="file"
            className="form-control-file"
            id="newImage"
            name="newImage"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="deleteImage"
            checked={formData.deleteImage}
            onChange={handleDeleteImageToggle}
          />
          <label className="form-check-label" htmlFor="deleteImage">Удалить изображение</label>
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary mr-2">Сохранить изменения</button>
          <Link to="/projects" className="btn btn-secondary">Назад</Link>
        </div>
      </form>
    </div>
  );
}

export default ProjectEditPage;
