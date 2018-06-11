const Router = require('express').Router;
const handlers = require('../handlers/handlers');

const router = Router();
module.exports = router;

router.get('/', handlers.hello);
router.get('/time', handlers.time);
router.get('/form', handlers.formRender);
router.post('/form', handlers.formPost)
router.get('/result', handlers.result);
router.get('/api/time', handlers.apiTime);
router.post('/api/users', handlers.apiUsersPost);
router.get('/api/users', handlers.apiUsers);