const { Vin, User, Star } = require('../models');

module.exports = {
  fetchVin: async (id) => {
    const vinData = await Vin.findOne({
        where: { id },
        include: [
          { model: User, attributes: { exclude: ['password'] } },
          { model: Star, attributes: ['stars'] }
        ]
      })

      const { dataValues } = vinData 

      const sumOfStars = dataValues.stars.reduce((acc, star) => {
        return acc + star.dataValues.stars
      }, 0)

      return {
        ...dataValues,
          stars: sumOfStars / dataValues.stars.length
      }
    }
}