import { DataTypes } from "sequelize";

const Orders = (sequelize) => {
  const Schema = {
    order_date: {
      type: DataTypes.DATE, //=VARCHAR(255)
      allowNull: false, //neleidžiamas tuščias laukas - Standartinė reikšmė true
    },
    status: {
      type: DataTypes.BOOLEAN, //=VARCHAR(255)
      allowNull: false, //neleidžiamas tuščias laukas - Standartinė reikšmė true
      defaultValue: false,
    },
  };

  return sequelize.define("orders", Schema);
};

export default Orders;
