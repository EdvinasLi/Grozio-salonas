import { DataTypes } from "sequelize";

const Ratings = (sequelize) => {
  const Schema = {
    rating: {
      type: DataTypes.INTEGER, //=VARCHAR(255)
      allowNull: false, //neleidžiamas tuščias laukas - Standartinė reikšmė true
    },
  };

  return sequelize.define("ratings", Schema);
};

export default Ratings;
