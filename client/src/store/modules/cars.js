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

};

const mutations = {
    setCreateCar: state => {
        if(state.createCar){
            state.createCar=false
        }
        else{
            state.createCar=true
        }
    },
    addCar: (state, {brand, model, years, matriculationNbr, autonomy}) => {
        console.log("Brand: "+brand);
        console.log("Model: "+model);
        console.log("Years: "+years);
        console.log("Autonomy: "+autonomy);
        console.log("matriculationNbr: "+matriculationNbr);
        state.cars.push({brand,model,years,matriculationNbr,autonomy})
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}