"use strict";

/**
 * category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async create(ctx) {
      const user = ctx.state.user;
      const { category, color } = ctx.request.body;
      try {
        const entity = await strapi.entityService.create(
          "api::category.category",
          {
            data: {
              user,
              name: category,
              color,
            },
          }
        );
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
      } catch (err) {
        console.log(err.name);
        return this.transformResponse({ error: err.name });
      }
    },
    async find(ctx) {
      try {
        const user = ctx.state.user.id;
        const categoriesEntity = await strapi.services[
          "api::category.category"
        ].find({
          filters: { user: user },
        });
        ctx.query.filters = {
          ...(ctx.query.filters || {}),
          user: user,
        };
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
  })
);
