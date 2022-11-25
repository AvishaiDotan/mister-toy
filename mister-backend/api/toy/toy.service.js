const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria.filterBy).sort(criteria.sortBy).toArray()
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
        console.log(toy);
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
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        const addedToy = await collection.insertOne(toy)
        console.log('Inserted succesfuly');
        return addedToy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}
async function update(toy) {

    try {
        // var id = ObjectId(toy._id)
        var id = ObjectId("637f8f0b31845149c9a4dd4c")
        delete toy._id
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: id }, { $set: { ...toy } })
        console.log('update toy');
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

// filterBy =  {
//     txt: 'a',
//     inStock: 'Stock',
//     labels: ['Art'],
//     sortBy: {
//       prop: '',
//       isDesc: true,
//     }
// },

// _buildCriteria(filterBy)

function _buildCriteria(filterBy) {
    if (!(filterBy?.txt || filterBy?.inStock === 'true' || (filterBy?.labels && filterBy?.labels.length))) return {}

        const criteria = {filterBy: { $and: [] }}
        
        if (filterBy?.txt) {
            criteria.filterBy.$and.push({ name: { $regex: filterBy.txt, $options: 'i' } })
        }
        
        if (filterBy?.inStock === 'true') {
            criteria.filterBy.$and.push({ inStock: true })
        }
        
        if (filterBy?.labels && filterBy?.labels.length) {
            const filter = { labels: { $all: filterBy.labels } }
            criteria.filterBy.$and.push(filter)
        }

        if (filterBy?.sortBy?.prop) criteria.sortBy = { [filterBy.sortBy.prop]: (filterBy.sortBy.isDesc === 'true') ? -1 : 1 }
        else criteria.sortBy = {}

        return criteria
}




module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}