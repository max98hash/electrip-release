const state =  {
    displayCharging: false,
}

const getters = {
    getDisplayCharging: state => state.displayCharging,
}

const actions = {

}

const mutations = {
    setDisplayChargingTrue: state => state.displayCharging = true,
    setDisplayChargingFalse: state => state.displayCharging = false,
}

export default {
    state,
    getters,
    actions,
    mutations,
}