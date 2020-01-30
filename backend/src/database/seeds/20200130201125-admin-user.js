require('dotenv').config();
const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Admin FastFeet',
          email: 'admin@fastfeet.com',
          password_hash: bcrypt.hashSync(process.env.ADMIN_PASS, 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
