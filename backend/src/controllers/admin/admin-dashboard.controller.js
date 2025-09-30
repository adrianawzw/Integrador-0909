// src/controllers/admin/admin-dashboard.controller.js


import * as adminDashboardService from '../../services/admin/admin-dashboard.service.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await adminDashboardService.getStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
};
