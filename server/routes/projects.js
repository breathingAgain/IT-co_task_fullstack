const { insertProject, getAllProjects, updateProject, getProjectById, deleteProject } = require('../db');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
router.use(express.urlencoded({ extended: true }));

router.use(express.json());


router.get('/', async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await getProjectById(id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).send('Project not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const { name, description } = req.body;
  const image = req.file; // Объект файла

  try {
    const imageUrl = `/uploads/${image.filename}`; 
    await insertProject(name, imageUrl, description);
    res.status(201).send('Project added successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const image = req.file; 

  try {
    const imageUrl = image ? `/uploads/${image.filename}` : null; 

    const updatedProject = await updateProject(id, name, imageUrl, description);
    res.status(200).json(updatedProject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProject(id);
    res.status(200).send('Project deleted successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
