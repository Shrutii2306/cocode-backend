const express = require('express');
const {  signupUser, getUsers, loginUser, getUser, getUserName } = require('../controller/userController');
const verifyToken = require('../middleware/authMiddleware');
const { createSession, getSession, checkSessionId, exitSession, joinSession, getSessionHistory } = require('../controller/sessionController');
const { saveHistory, getLastCheckPoint } = require('../controller/codeController');

const router = express.Router();

// user routes
router.post('/users', signupUser);
router.get('/users', getUsers);
router.post('/user', loginUser);
router.get('/user', verifyToken, getUser);
router.post('/username',getUserName);

// session routes
router.post('/session',verifyToken, createSession);
router.post("/getSession", verifyToken, getSession);
router.post('/isSessionValid', verifyToken, checkSessionId);
router.post('/joinSession', verifyToken, joinSession);
router.post('/exitSession', verifyToken, exitSession);
router.post('/sessionHistory',verifyToken, getSessionHistory);

// code routes
router.post('/saveCodeSnippet',verifyToken, saveHistory);
router.post('/getLastCheckpoint', getLastCheckPoint);

router.get('/hello',(req,res) =>{
    console.log('first');
})
module.exports = router;