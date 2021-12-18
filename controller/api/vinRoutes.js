const router = require('express').Router();
const { Vin, User, Star } = require('../../models');
const { fetchVin } = require('../../utils/fetchVin');

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    console.log(limit)
    const vinData = await Vin.findAndCountAll({
      limit,
      offset,
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Star, attributes: ['stars'] }
      ]
    })

    const vinDataWithStars = vinData.rows.map(({ dataValues }) => {
      const sumOfStars = dataValues.stars.reduce((acc, star) => {
        return acc + star.dataValues.stars
      }, 0)

      return {
        ...dataValues,
        stars: sumOfStars / dataValues.stars.length
      }
    })

    res.status(200).json(vinDataWithStars)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const vinData = await fetchVin(req.params.id);
    res.status(200).json(vinData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try { 
    await Vin.update(req.body, {
      where: { id: req.params.id }
    })

    const vinData = await fetchVin(req.params.id);
    res.status(200).json(vinData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.post('/rate', async (req, res) => {
  try {
    const starData = await Star.findOrCreate({
      where: {
        user_id: req.body.user_id,
        vin_id: req.body.vin_id
      },
      defaults: {
        stars: req.body.stars
      }
    })

    const vinData = await fetchVin(req.params.vin_id);
    res.status(200).json(vinData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const vinData = await Vin.create(req.body, {
      include: [{ model: User, attributes: { exclude: ['password'] } }]
    })

    await Star.create({
      user_id: req.body.user_id,
      vin_id: vinData.id,
      stars: req.body.stars
    })

    res.status(200).json(vinData)
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const vinData = await Vin.destroy({
      where: { id: req.params.id }
    })

    res.status(200).json(vinData ? 'Vin deleted' : 'Vin not found')
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router;