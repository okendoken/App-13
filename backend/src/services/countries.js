const db = require('../db/models');
const CountriesDBApi = require('../db/api/countries');

module.exports = class CountriesService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await CountriesDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let countries = await CountriesDBApi.findBy({ id }, { transaction });

      if (!countries) {
        throw new ValidationError('countriesNotFound');
      }

      await CountriesDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return countries;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await CountriesDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
