const state =  {
    displayCharging: true,
    map: null,
}

const getters = {
    getDisplayCharging: state => state.displayCharging,
    getMapCharging: state => state.map,
}

const actions = {

}

const mutations = {
    setDisplayChargingTrue: state => state.displayCharging = true,
    setDisplayChargingFalse: state => state.displayCharging = false,
    setMap: (state, map ) => state.map = map,
}

export default {
    state,
    getters,
    actions,
    mutations,
}