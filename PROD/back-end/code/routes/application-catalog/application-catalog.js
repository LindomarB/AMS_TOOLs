const router = require('express').Router();

const { getApplicationCatalog, getSupportGroups, getFilters } = require('../../apis/application-catalog/application-catalog');
const { exportData } = require('../../controllers/ams-tools/exportData');
const { validateToken } = require('../../middleware/token');
const Application = require('../../model/Application');

// router.get('/', validateToken);

router.get('/', getApplicationCatalog);

router.get('/support-groups', getSupportGroups);

router.get('/filters', getFilters);

router.get('/export', (req, res) => exportData(req, res, Application));

module.exports = router;