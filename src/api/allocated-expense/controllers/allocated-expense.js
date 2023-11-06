"use strict";

/**
 * allocated-expense controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::allocated-expense.allocated-expense",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const user = ctx.state.user.id;
        const categoriesEntity = await strapi.services[
          "api::allocated-expense.allocated-expense"
        ].find({
          filters: { user: user, ...ctx.query.filters },
        });
        const sanitizedEntity = await this.sanitizeOutput(
          categoriesEntity,
          ctx
        );
        return this.transformResponse(sanitizedEntity);
      } catch (err) {
        console.error(err);
        ctx.response.status = 500;
        ctx.send({ error: "Internal server error" });
      }
    },
    async getMonthlyData(ctx) {
      try {
        const { firstDayOfMonth, lastDayOfMonth } = ctx.request.body;
        console.log("[CTX]:", firstDayOfMonth, lastDayOfMonth);
        const user = ctx.state.user.id;
        const dataEntity = await strapi.services[
          "api::allocated-expense.allocated-expense"
        ].find({
          filters: { user: user },
        });

        const sanitizedEntity = await this.sanitizeOutput(dataEntity, ctx);
        return this.transformResponse(sanitizedEntity);
      } catch (err) {
        console.error(err);
        ctx.response.status = 500;
        ctx.send({ error: "Internal server error" });
      }
    },
  })
);
