'use strict';

/**
 * user-income service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-income.user-income');
