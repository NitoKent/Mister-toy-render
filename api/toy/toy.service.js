import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
// import { utilService } from '../../services/util.service.js'

export const toyService = {
	query,
	getById,
	remove,
	add,
	update,
	// addToyMsg,
	// removeToyMsg,
}

async function query(filterBy = {}) {
	try {
		const criteria = {
			name: { $regex: filterBy.txt, $options: 'i' },
		}

		const collection = await dbService.getCollection('toy')
		var toys = await collection.find(criteria).toArray()
		return toys
	} catch (err) {
		logger.error('cannot find toys', err)
		throw err
	}
}

async function getById(toyId) {
	try {
		const collection = await dbService.getCollection('toy')
		const toy = collection.findOne({ _id: ObjectId(toyId) })
		return toy
	} catch (err) {
		logger.error(`while finding toy ${toyId}`, err)
		throw err
	}
}

async function remove(toyId) {
	try {
		const collection = await dbService.getCollection('toy')
		await collection.deleteOne({ _id: ObjectId(toyId) })
	} catch (err) {
		logger.error(`cannot remove toy ${toyId}`, err)
		throw err
	}
}

async function add(toy) {
	try {
		const collection = await dbService.getCollection('toy')
		await collection.insertOne(toy)
		return toy
	} catch (err) {
		logger.error('cannot insert toy', err)
		throw err
	}
}

async function update(toy) {
	try {
		const toyToSave = {
			price: toy.price,
		}
		const collection = await dbService.getCollection('toy')
		await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
		return toy
	} catch (err) {
		logger.error(`cannot update toy ${toyId}`, err)
		throw err
	}
}