import { DataTypes } from "sequelize";

const Services = (sequelize) => {
  const Schema = {
    Name: {
      type: DataTypes.STRING, //=VARCHAR(255)
      allowNull: false, //neleidžiamas tuščias laukas - Standartinė reikšmė true
    },
    duration: {
      type: DataTypes.STRING, //=VARCHAR(255)
      allowNull: false, //neleidžiamas tuščias laukas - Standartinė reikšmė true
    },
    price: {
      type: DataTypes.NUMBER, //=VARCHAR(255)
      allowNull: false, //neleidžiamas tuščias laukas - Standartinė reikšmė true
    },
  };

  return sequelize.define("services", Schema);
};

export default Services;
