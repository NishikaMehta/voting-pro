const mongoose = require('mongoose');

const userAuditSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    oldData: { type: Object },
    newData: { type: Object },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserAudit', userAuditSchema);
