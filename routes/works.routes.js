const { Router } = require('express');
const { body } = require('express-validator');
const Works = require('../models/Works.js');
const auth = require('../middleware/auth.middleware.js');
const router = Router();


router.post('/create', [
  body(`name`).not().trim(),
  body(`dateStart`).not().trim(),
  body(`dateEnd`).not().trim(),
  body(`unit`).not().trim(),
  body(`count`).not().trim(),
  body(`pricePerOne`).not().trim(),
], auth, async (req, res) => {
  try {
    const { name, dateStart, dateEnd, unit, count, pricePerOne, projectId } = req.body;

    const existing = await Works.findOne({ name });

    if (existing) {
      res.status(409).json({ messaje: `Работы с таким названием уже существуют` });
    }

    const works = new Works({
      name, dateStart, dateEnd,  unit, count, pricePerOne, projectId
    });

    await works.save();

    res.status(201).json({ works });
  } catch (e) {
    res.status(500).json({message: `Что-то пошло не так. ${ e }`});
  };  
});

router.get('/:id', auth, async (req, res) => {
  try {
    const works = await Works.find({ projectId: req.params.id });
    res.json(works);
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так! ${ e }` });
  };
});

module.exports = router;
