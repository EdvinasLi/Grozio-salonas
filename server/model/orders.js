import { DataTypes } from "sequelize";

const Orders = (sequelize) => {
  const Schema = {
    order_date: {
      type: DataTypes.DATE, //=VARCHAR(255)
      allowNull: false, //neleidžiamas tuščias laukas - Standartinė reikšmė true
    },
  };

  return sequelize.define("orders", Schema);
};

export default Orders;
