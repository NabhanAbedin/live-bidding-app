const express = require('express');
const router = express.Router({mergeParams: true});
const ctrl = require('../controllers/chatsController');

//this will be designed for getting the chats for a specific bid if a user joins in the middle of the session to see previous chats before they joined, and as well as for the user that posted the bid to be able to read the chat after it ended, specifically for the user that posted it, will have two different routes for that maybe

router
    .route('/')
    .get(ctrl.getChats)




module.exports = router;