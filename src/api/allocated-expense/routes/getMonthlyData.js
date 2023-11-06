module.exports = {
  routes: [
    {
      method: "POST",
      path: "/getMonthlyData",
      handler: "allocated-expense.getMonthlyData",
      config: {
        policies: [],
      },
    },
  ],
};
