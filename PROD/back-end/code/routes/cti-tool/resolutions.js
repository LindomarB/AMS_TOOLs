const { updateFavoriteResolutions } = require('../../apis/cti-tool/user-settings');
const { exportData } = require('../../controllers/ams-tools/exportData');
const { newResolution, getResolutions, deleteResolution, getFilters, editResolution, updateProgress, deleteProgress } = require('../../apis/cti-tool/resolution');
const { validateToken } = require('../../middleware/token');
const Resolution = require('../../model/resolution/Resolution');
const { getUser } = require('../../apis/ams-tools/user');

const resolutionsRouter = require('express').Router();

resolutionsRouter.get('/*', validateToken);

resolutionsRouter.get('/', getResolutions);

resolutionsRouter.get('/in-progress', (req, res, _) => getResolutions(req, res, _, true));

resolutionsRouter.get('/filters', getFilters);

resolutionsRouter.get('/export', (req, res) => exportData(req, res, Resolution));

resolutionsRouter.post('/*', validateToken);

resolutionsRouter.post('/*', getUser);

resolutionsRouter.post('/', newResolution);

resolutionsRouter.post('/in-progress', (req, res, _) => newResolution(req, res, _, true));

resolutionsRouter.patch('/*', validateToken);

resolutionsRouter.patch('/edit', getUser);

resolutionsRouter.patch('/edit', editResolution);

resolutionsRouter.patch('/delete', getUser);

resolutionsRouter.patch('/delete', deleteResolution);

resolutionsRouter.patch('/favorites', getUser);

resolutionsRouter.patch('/favorites', updateFavoriteResolutions);

resolutionsRouter.patch('/in-progress/update', updateProgress);

resolutionsRouter.patch('/in-progress/delete', deleteProgress);

module.exports = resolutionsRouter;