import { DataTypes } from "sequelize";

const Saloons = (sequelize) => {
  const Schema = {
    adress: {
      type: DataTypes.STRING, //=VARCHAR(255)
      allowNull: false, //neleidžiamas tuščias laukas - Standartinė reikšmė true
    },
    name: {
      type: DataTypes.STRING, //=VARCHAR(255)
      allowNull: false, //neleidžiamas tuščias laukas - Standartinė reikšmė true
    },
    phone: {
      type: DataTypes.STRING, //=VARCHAR(255)
      allowNull: false, //neleidžiamas tuščias laukas - Standartinė reikšmė true
    },
  };

  return sequelize.define("saloons", Schema);
};

export default Saloons;
