const { Router } = require('express');
const Project = require('../models/Project.js');
const auth = require('../middleware/auth.middleware.js');
const router = Router();


router.post('/generate', auth, async (req, res) => {
  try {
    const { name, dateStart, dateEnd, location } = req.body;

    const existing = await Project.findOne({ name });

    if (existing) {
      res.status(409).json({ messaje: `Проект с таким именем уже существует` });
    }

    const project = new Project({
      name, dateStart, dateEnd, location
    });

    await project.save();

    res.status(201).json({ project });
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так. Error ${ e }` });
  };  
});

router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так. Error ${ e }` });
  };
});

router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так. Error ${ e }` });
  };  
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedProject = await Project.findOneAndDelete({_id: req.params.id});
    res.json(deletedProject);
    console.log(req.params);
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так. Error ${ e }` });
  }
});

module.exports = router;
