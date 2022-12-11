const Request = require('../models/requestModel');
const mongoose = require('mongoose');

const getRequests = async (req, res) => {
	console.log(req.user._id, 'user id');
	try {
		const requests = await Request.find().sort({ createdAt: 1 });
		// .sort({ deadlineDate: 1 })

		res.status(200).json(requests);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// get a single workout
const getRequest = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such request' });
	}
	const request = await Request.findById(id);
	if (!request) {
		return res.status(404).json({ error: 'No such request' });
	}
	res.status(200).json(request);
};

const createRequest = async (req, res) => {
	const { title, artist, style, notes, isComplete } = req.body;
	const user_id = req.user._id;
	console.log(user_id, 'user id - create request');

	const request = new Request({
		title,
		artist,
		style,
		notes,
		isComplete,
		user_id,
	});

	try {
		console.log('full request', request);
		const newRequest = await request.save();
		res.status(201).json(newRequest);
	} catch (err) {
		console.log(err);
		res.status(409).json({ message: err.message });
	}
};

const updateRequest = async (req, res) => {
	// const { id: _id } = req.params;
	const { updatedSongData } = req.body;
	console.log(updatedSongData, 'updated request data');
	// const request = req.body;
	// console.log(request, 'request in update');
	// console.log(id, 'id in update');

	if (!mongoose.Types.ObjectId.isValid(updatedSongData.songID))
		return res.status(404).send('No request with that ID!');

	const _id = updatedSongData.songID;

	const updatedRequest = await Request.findByIdAndUpdate(
		updatedSongData.songID,
		{ ...updatedSongData, _id },
		{
			// title: updatedRequestData.title,
			// isComplete: updatedRequestData.isComplete,
			new: true,
		}
	);

	res.json(updatedRequest);
};

const deleteRequest = async (req, res) => {
	const { id } = req.params;
	console.log(id, 'id');

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send('No request with that ID!');

	await Request.findByIdAndRemove(id);

	console.log('DELETE');

	res.json({ message: 'request deleted successfully' });
};

module.exports = {
	getRequest,
	getRequests,
	createRequest,
	updateRequest,
	deleteRequest,
};
