'use strict';

/**
 * allocated-expense service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::allocated-expense.allocated-expense');
