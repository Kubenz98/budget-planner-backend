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
      console.log(user);
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
    },
  })
);
