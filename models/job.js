const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
	id: Number,
	html: String,
	url: String
});

const Job = (module.exports = mongoose.model('Job', JobSchema));

module.exports.getJobs = (callback, limit) => {
	Job.find(callback).limit(limit);
};
