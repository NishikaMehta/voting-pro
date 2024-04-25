const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const electionController = require('../controllers/electionController');
const castVoteController = require('../controllers/castVoteController');

const partyController = require('../controllers/partyController');
const candidateController = require('../controllers/candidateController');
const electionCandidateController = require('../controllers/electionCandidateController');

const userDetailsController = require('../controllers/userDetailsController');
const elctionDetails = require("../controllers/electiondetails");
const Election = require('../models/election');
router.get('/dashboard', async (req, res) => {
  try {
    // Pass the req object to the function that uses it
    const votes = await castVoteController.getMyCastVote(req);
    res.render('userNavbar', { page: 'userDashboard', votes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/castVote', async (req, res) => {
  try {
    const elections = await electionController.getAllElectionName();
    const candidates = await candidateController.getAllCandidateName();
    // const electionCandidates = await electionCandidateController.getAllElectionCandidates();
    res.render('userNavbar', {
      page: 'userCastVote',
      elections,
      candidates,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/account', (req, res) => {
  try {
    userDetailsController.getUserDetails(req, res) // Pass req and res here
      .then(details => {
        res.render('userNavbar', { page: 'userAccount', details });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/electionDetails', async (req, res) => {
  try {
    const electionDetails = await electionController.getElectionDetails();
    res.render('userNavbar', { page: 'electionDetails', electionDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

router.get("/candidateDetails", async (req, res) => {
  try {
    // Assuming you have a function in your controller to retrieve candidate details for a specific election
    const electionId = req.query.electionId; // Assuming the election ID is passed as a query parameter
    const candidateDetails = await candidateController.getCandidateDetailsByElectionId(electionId); // Call the controller function to get candidate details
    console.log(candidateDetails);
    // Render the candidate details template and pass the candidateDetails object to it
    res.render("candidateDetails.ejs", { candidateDetails });
    
  } catch (err) {
    // Handle any errors
    res.status(500).json({ error: err.message });
  }
  
});

module.exports = router;