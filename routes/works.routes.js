const { Router } = require('express');
const Works = require('../models/Works.js');
const auth = require('../middleware/auth.middleware.js');
const router = Router();


router.post('/create', auth, async (req, res) => {
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
