"use strict";

const ValidationError = require("../../../classes/ValidationError");

/**
 * category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async create(ctx) {
      const user = ctx.state.user;
      const { category, color, id } = ctx.request.body;
      try {
        console.log(id);
        const categoriesEntity = await strapi.services[
          "api::category.category"
        ].find({
          filters: { user: user },
        });
        console.log(categoriesEntity);

        let categoryExists = false;
        categoriesEntity.results.forEach((item) => {
          if (item.name.toLowerCase().trim() === category.toLowerCase()) {
            categoryExists = true;
          }
        });

        if (!categoryExists) {
          if (id) {
            const entity = await strapi.entityService.update(
              "api::category.category",
              id,
              {
                data: {
                  name: category.trim(),
                  color,
                },
              }
            );
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitizedEntity);
          } else {
            const entity = await strapi.entityService.create(
              "api::category.category",
              {
                data: {
                  user,
                  name: category.trim(),
                  color,
                },
              }
            );
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitizedEntity);
          }
        } else {
          if (id) {
            const entity = await strapi.entityService.update(
              "api::category.category",
              id,
              {
                data: {
                  name: category.trim(),
                  color,
                },
              }
            );
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitizedEntity);
          } else {
            throw new ValidationError("Category exists");
          }
        }
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
