import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async () => {
    try {
      for (const projectId of selectedProjects) {
        const response = await fetch(`/projects/${projectId}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Failed to delete project');
        }
      }

      const updatedProjects = projects.filter(project => !selectedProjects.includes(project.id));
      setProjects(updatedProjects);
      setSelectedProjects([]);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const toggleProjectSelection = projectId => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

  const cancelDelete = () => {
    setSelectedProjects([]);
    setShowConfirmation(false);
  };

  return (
    <div className="container">
    <h1>Список проектов</h1>
    <div className="projects-grid">
      {projects.map(project => (
        <div key={project.id} className="project-card">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`projectCheckbox-${project.id}`}
              checked={selectedProjects.includes(project.id)}
              onChange={() => toggleProjectSelection(project.id)}
            />
            <label className="form-check-label" htmlFor={`projectCheckbox-${project.id}`}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              {project.image && (
                <img src={project.image} alt="Project" className="img-fluid mb-3" />
              )}
            </label>
          </div>
          <Link to={`/projects/${project.id}`} className="btn btn-primary mr-2">Редактировать</Link>
        </div>
      ))}
    </div>
    <Link to="/projects/new" className="btn btn-success mt-3">Создать новый проект</Link>

      {showConfirmation && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Подтверждение</h5>
              </div>
              <div className="modal-body">
                Удалить все выбранные проекты?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Назад</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Удалить</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedProjects.length > 1 && (
        <button type="button" className="btn btn-danger mt-3" onClick={() => setShowConfirmation(true)}>
          Удалить выбранные проекты
        </button>
      )}
      
      {selectedProjects.length === 1 && (
        <button type="button" className="btn btn-danger mt-3" onClick={handleDelete}>
          Удалить выбранный проект
        </button>
      )}
    </div>
  );
}

export default ProjectListPage;
