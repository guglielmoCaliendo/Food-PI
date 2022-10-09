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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      abstract: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      img_url: {
        type: DataTypes.TEXT,
      },
      health_score: {
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
