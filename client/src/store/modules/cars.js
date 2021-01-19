const axios = require('axios');

const state = {
    createCar: true,
    cars: [
        { brand: 'Renault', model: 'Zoé', years: '2019', matriculationNbr: 'XC-24D6-FD', autonomy: '120' , _id:"45efze54z8EF65RG"}/*,
        { brand: 'Tesla', model: 'Model S', years: '2018', matriculationNbr: 'KN-XM9Q-ZE', autonomy: '150' },
        { brand: 'Nissan', model: 'Leaf', years: '2020', matriculationNbr: 'LM-28RP-QM', autonomy: '210' },*/
      ],
};

const getters = {
    getCreateCar: state => state.createCar,
    getCars: state => state.cars,
};

const actions = {
    async fetchCars({commit},token){
        const response = await axios.get('http://localhost:3000/cars',{
            headers: {
            'x-access-token': token
            }
        });
        console.log("fetch cars : ");
        console.log(response.data)
        commit('setCars',response.data);
    },
    async addCar({commit},{car,token}){
        console.log(car);
        console.log(token);
        const response = await axios.post(
            'http://localhost:3000/cars/create',car,{
                headers: {
                'x-access-token': token
                }
            }
        );
        console.log("add car : ");
        console.log(response.data)
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