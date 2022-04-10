const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

// GETs all the posts
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find()
		res.status(200).json(posts)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// GET a specific post

router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		res.status(200).json(post)
	} catch (err) {
		res.status(404).json({ message: err.message })
	}
})

// Submits a post
router.post('/', async (req, res) => {
	const post = new Post({
		title: req.body.title,
		description: req.body.description,
	})

	try {
		const createdPost = await post.save()
		res.status(201).json(createdPost)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: err.message })
	}
})

// DELETE a specific post

router.delete('/:id', async (req, res) => {
	try {
		const deletedPost = await Post.deleteOne({ _id: req.params.id })
		res.status(200).json(deletedPost)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// Update a post

router.patch('/:id', async (req, res) => {
	try {
		const updatedPost = await Post.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					title: req.body.title,
					description: req.body.description,
				},
			}
		)
		res.status(200).json(updatedPost)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

module.exports = router
