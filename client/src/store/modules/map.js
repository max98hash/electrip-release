const state =  {
    displayCharging: true,
    map: null,
    markers: [],
    markersCharging: [],
}

const getters = {
    getDisplayCharging: state => state.displayCharging,
    getMapCharging: state => state.map,
    getMarkers: state => state.markers,
    getMarkersCharging: state => state.markersCharging,
}

const actions = {

}

const mutations = {
    setDisplayChargingTrue: state => state.displayCharging = true,
    setDisplayChargingFalse: state => state.displayCharging = false,
    setMap: (state, map ) => state.map = map,
    setMarkers: (state, markers) => state.markers = markers,
    setMarkersCharging: (state, markers) => state.markersCharging = markers,
}

export default {
    state,
    getters,
    actions,
    mutations,
}