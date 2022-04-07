const express = require('express');
const debug = require('debug')('router index');
const verifyToken = require('../../helpers/verifyToken');
// const verifyUserAccess = require('../../helpers/verifyUserAccess');

const userRouter = require('./user');
const signinRouter = require('./signin');
const homeRouter = require('./home');
// const rewardRouter = require('./reward');
// const home_taskRouter = require('./home_task');
// const attributed_taskRouter = require('./attributed_task');
// const done_taskRouter = require('./done_task');

const dashboardRouter = require('./dashboard');
const mytasksRouter = require('./mytasks');
const myhomeRouter = require('./myhome');
const rankingRouter = require('./ranking');

// const { apiController } = require('../../controllers/api');

const { ApiError } = require('../../helpers/errorHandler');

const router = express.Router();

router.use((_, res, next) => {
  res.type('json');
  next();
});

// Route par défaut de l'API, ici on la configure pour toutes les méthodes
// afin de donner l'information en cas d'oubli de spéfication de la route par l'utilisateur
// router.all('/', apiController.home);

// On préfixe les routers de l'API
router.use('/signin', signinRouter);
router.use('/users', userRouter);
router.use('/homes', verifyToken.InReqAuthorisation, homeRouter);
// router.use('/rewards', verifyToken.InReqAuthorisation, rewardRouter);
// router.use('/home_tasks', verifyToken.InReqAuthorisation, home_taskRouter);
// router.use('/attributed_tasks', verifyToken.InReqAuthorisation, attributed_taskRouter);
// router.use('/done_tasks', verifyToken.InReqAuthorisation, done_taskRouter);
// router.use('/generic_tasks', verifyToken.InReqAuthorisation, generic_taskRouter);

router.use('/dashboard', verifyToken.InReqAuthorisation, dashboardRouter);
router.use('/mytasks', verifyToken.InReqAuthorisation, mytasksRouter);
router.use('/myhome', verifyToken.InReqAuthorisation, myhomeRouter);
router.use('/ranking', verifyToken.InReqAuthorisation, rankingRouter);

router.use(() => {
  debug('route not found');
  throw new ApiError('API Route not found', { statusCode: 404 });
});

module.exports = router;
