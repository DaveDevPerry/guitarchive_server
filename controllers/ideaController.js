const Idea = require('../models/ideaModel');
const mongoose = require('mongoose');

const getIdeas = async (req, res) => {
	console.log(req.user._id, 'user id');
	try {
		const ideas = await Idea.find().sort({ createdAt: 1 });
		// .sort({ deadlineDate: 1 })

		res.status(200).json(ideas);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// get a single workout
const getIdea = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such idea' });
	}
	const idea = await Idea.findById(id);
	if (!idea) {
		return res.status(404).json({ error: 'No such idea' });
	}
	res.status(200).json(idea);
};

const createIdea = async (req, res) => {
	const { title, artist, style, notes, isComplete } = req.body;
	const user_id = req.user._id;
	console.log(user_id, 'user id - create idea');

	const idea = new Idea({
		title,
		artist,
		style,
		notes,
		isComplete,
		user_id,
	});

	try {
		console.log('full idea', idea);
		const newIdea = await idea.save();
		res.status(201).json(newIdea);
	} catch (err) {
		console.log(err);
		res.status(409).json({ message: err.message });
	}
};

const updateIdea = async (req, res) => {
	// const { id: _id } = req.params;
	const { updatedSongData } = req.body;
	console.log(updatedSongData, 'updated idea data');
	// const idea = req.body;
	// console.log(idea, 'idea in update');
	// console.log(id, 'id in update');

	if (!mongoose.Types.ObjectId.isValid(updatedSongData.songID))
		return res.status(404).send('No idea with that ID!');

	const _id = updatedSongData.songID;

	const updatedIdea = await Idea.findByIdAndUpdate(
		updatedSongData.songID,
		{ ...updatedSongData, _id },
		{
			// title: updatedIdeaData.title,
			// isComplete: updatedIdeaData.isComplete,
			new: true,
		}
	);

	res.json(updatedIdea);
};

const deleteIdea = async (req, res) => {
	const { id } = req.params;
	// console.log(id, 'id');

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send('No idea with that ID!');

	await Idea.findByIdAndRemove(id);

	console.log('DELETE');

	res.json({ message: 'idea deleted successfully' });
};

module.exports = {
	getIdea,
	getIdeas,
	createIdea,
	updateIdea,
	deleteIdea,
};
