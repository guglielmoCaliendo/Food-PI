const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'recipe',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      image: {
        type: DataTypes.TEXT,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        defaultValues: 0,
      },
      steps: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
    },
    {
      timestamps: false,
    }
  );
};
