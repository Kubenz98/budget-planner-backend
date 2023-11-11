"use strict";

/**
 * allocated-expense controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const mergeObjectsById = require("../helpers/mergeObjects");

module.exports = createCoreController(
  "api::allocated-expense.allocated-expense",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const user = ctx.state.user.id;
        const monthlyExpenses = await strapi.services[
          "api::allocated-expense.allocated-expense"
        ].find({
          filters: { user: user, ...ctx.query.filters },
          populate: ["category"],
        });
        //filters with first and last day of month
        const categoriesEntity = await strapi.services[
          "api::category.category"
        ].find({
          filters: { user: user },
        });
        let mergedEntities = [];
        if (
          categoriesEntity.results.length !== 0 &&
          monthlyExpenses.results.length !== 0
        ) {
          for (const category of categoriesEntity.results) {
            for (const expense of monthlyExpenses.results) {
              mergeObjectsById(category, expense, mergedEntities);
            }
          }
        } else {
          mergedEntities = categoriesEntity.results;
        }
        mergedEntities.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
        const sanitizedEntity = await this.sanitizeOutput(mergedEntities, ctx);
        return this.transformResponse(sanitizedEntity);
      } catch (err) {
        console.error(err);
        ctx.response.status = 500;
        ctx.send({ error: "Internal server error" });
      }
    },
  })
);
