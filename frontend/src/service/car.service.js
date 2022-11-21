

export const carService = {
    query,
    getById,
    remove,
    save,
    getEmptyCar
}

const BASE_URL = `/api/car/` 


function query() {
    return axios.get(BASE_URL).then(res => res.data)
}
function getById(carId) {
    return axios.get(BASE_URL + carId).then(res => res.data)
}
function remove(carId) {
    return axios.get(BASE_URL + carId + '/remove').then(res => res.data)
}

function save(car) {
    const url = BASE_URL + 'save'
    var queryParams = `?vendor=${car.vendor}&speed=${car.speed}`
    if (car._id) queryParams += `&_id=${car._id}`

    return axios.get(url + queryParams).then(res=>res.data)
}

function getEmptyCar() {
    return {
        _id: '',
        vendor: '',
        speed : 0,
        desc: ''
    }
}