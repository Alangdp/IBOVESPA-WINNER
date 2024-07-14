/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: [true, 'Name is required'],
          len: {
            args: [4, 100],
            msg: 'Name must be between 4 and 100 characters',
          },
        },
      },

      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: [true, 'Password is required'],
          len: {
            args: [4, 100],
            msg: 'Password must be between 4 and 100 characters',
          },

          is: {
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            msg: 'Password must have at least one special character, one number, one lowercase and one uppercase letter',
          },
        },
      },

      email: {
        unique: true,
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: [true, 'Email is required'],
          len: {
            args: [4, 100],
            msg: 'Email must be between 4 and 100 characters',
          },
          isEmail: {
            msg: 'Email must be valid',
          },
        },
      },

      phone: {
        unique: true,
        type: Sequelize.STRING(11),
        allowNull: false,
        validate: {
          notEmpty: [true, 'Phone is required'],
          len: {
            args: [11, 11],
            msg: 'Phone must have 11 characters',
          },
        },
      },

      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('Users');
  },
};
