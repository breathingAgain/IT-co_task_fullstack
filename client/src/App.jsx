import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectListPage from './pages/ProjectListPage';
import ProjectEditPage from './pages/ProjectEditPage';
import ProjectNewPage from './pages/ProjectNewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectListPage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/new" element={<ProjectNewPage />} />
        <Route path="/projects/:projectId" element={<ProjectEditPage />} />
      </Routes>
    </Router>
  );
}

export default App;

