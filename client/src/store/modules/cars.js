const axios = require('axios');

const state = {
    createCar: true,
    cars: [
        { brand: 'Renault', model: 'Zoé', years: '2019', matriculationNbr: 'XC-24D6-FD', autonomy: '120' },
        { brand: 'Tesla', model: 'Model S', years: '2018', matriculationNbr: 'KN-XM9Q-ZE', autonomy: '150' },
        { brand: 'Nissan', model: 'Leaf', years: '2020', matriculationNbr: 'LM-28RP-QM', autonomy: '210' },
      ],
};

const getters = {
    getCreateCar: state => state.createCar,
    getCars: state => state.cars,
};

const actions = {
    async fetchCars({commit}){
        const response = await axios.get(
            'http://localhost:3000/cars'
        );
        commit('setCars',response.data);
    },
    async addCar({commit},car){
        const response = await axios.post(
            'http://localhost:3000/cars/create',car
        );
        commit('newCar',response.data);
    }
};

const mutations = {
    setCreateCar: state => state.createCar=!state.createCar,
    setCars: (state, cars) => state.cars = cars ,
    newCar: (state, car) => state.cars.push(car),
};

export default {
    state,
    getters,
    actions,
    mutations,
}