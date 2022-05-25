const express = require('express');

const EventControllers = require('../Controllers/EventControllers');
const { IsAuth } = require('../Middleware/IsAuth');

const router = express.Router();

router.get('/getevents',EventControllers.getAllEvents);
router.post('/addevents',IsAuth,EventControllers.addNewEvent);
router.delete('/deleteevent/:id',IsAuth,EventControllers.deleteEvent);

module.exports = router;