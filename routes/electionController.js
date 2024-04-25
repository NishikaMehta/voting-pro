// controllers/electionController.js

const Election = require('../models/election'); // Import the Election model or adjust as needed
const electionController = require('../controllers/electionController');
async function getCandidateDetailsByElectionId(electionId) {
    try {
        // Assuming the Election model has a method to populate the candidates field with candidate details
        const election = await Election.findById(electionId).populate('candidates');
        if (!election) {
            throw new Error('Election not found');
        }
        return election.candidates; // Assuming candidates is an array of candidate details
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getCandidateDetailsByElectionId
};
