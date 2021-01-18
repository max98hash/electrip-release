const state =  {
    displayCharging: true,
    map: null,
    markers: [],
    markersCharging: [],
    stations: [],
    pickStation: false,
    clickStation: false,
}

const getters = {
    getDisplayCharging: state => state.displayCharging,
    getMapCharging: state => state.map,
    getMarkers: state => state.markers,
    getMarkersCharging: state => state.markersCharging,
    getStations: state => state.stations,
    getPickStation: state => state.pickStation,
    getClickStation: state => state.clickStation,
}

const actions = {

}

const mutations = {
    setDisplayChargingTrue: state => state.displayCharging = true,
    setDisplayChargingFalse: state => state.displayCharging = false,
    setMap: (state, map ) => state.map = map,
    setMarkers: (state, markers) => state.markers = markers,
    setMarkersCharging: (state, markers) => state.markersCharging = markers,
    addOrRemoveStation: (state, station) => {
        let alreadyExists = false;
        let indexToRemove = null;
        for (let i=0; i<state.stations.length; i++) { //iterate through each object in an array
            if (JSON.stringify(state.stations[i]) === JSON.stringify(station) ) {
                    alreadyExists = true;
                    indexToRemove=i;
                    break;
            }
        }
        if(!alreadyExists){
            console.log("La station n'existait pas on ajoute")
            state.stations.push(station)
        }else{
            console.log("La station existait on supprime")
            state.stations.splice(indexToRemove, 1);
        }
    },
    setPickStationToTrue: state => state.pickStation = true,
    setPickStationToFalse: state => state.pickStation = false,
    setClickStationInvert: state => state.clickStation = !state.clickStation,
}

export default {
    state,
    getters,
    actions,
    mutations,
}