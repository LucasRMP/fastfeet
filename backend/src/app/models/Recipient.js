import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        compliment: Sequelize.STRING,
        state: Sequelize.CHAR(2),
        city: Sequelize.STRING,
        postal_code: Sequelize.CHAR(8),
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;
