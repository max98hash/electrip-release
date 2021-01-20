import axios from 'axios';

const state =  {
    displayCharging: true,
    map: null,
    markers: [],
    markersCharging: [],
    stations: [],
    pickStation: false,
    clickStation: false,
    trajectInModification: null,
    viewTraject: false,
}

const getters = {
    getDisplayCharging: state => state.displayCharging,
    getMapCharging: state => state.map,
    getMarkers: state => state.markers,
    getMarkersCharging: state => state.markersCharging,
    getStations: state => state.stations,
    getPickStation: state => state.pickStation,
    getClickStation: state => state.clickStation,
    getTrajectInModification: state => state.trajectInModification,
    getViewtraject: state => state.viewTraject,
    getDisplayATraject: state => state.viewTraject || state.displayCharging,
}

const actions = {
    async addStationsToTraject({commit},{stations,token}){
        const traject = await axios.get('http://localhost:5555/trajects/'+state.trajectInModification,{
            headers: {
            'x-access-token': token
            }
        })
        let newStations = [];
        for (let index = 0; index < stations.length; index++) {
            newStations.push(stations[index])
        }
        traject.data.stations = newStations;
        await axios.put('http://localhost:5555/trajects/'+state.trajectInModification,traject.data,{
            headers: {
            'x-access-token': token
            }
        });
        commit('trajectUpdated');
    }
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
            state.stations.push(station)
        }else{
            state.stations.splice(indexToRemove, 1);
        }
    },
    setPickStationToTrue: state => state.pickStation = true,
    setPickStationToFalse: state => state.pickStation = false,
    setClickStationInvert: state => state.clickStation = !state.clickStation,
    setTrajectInModification: (state,trajectId) => state.trajectInModification = trajectId,
    trajectUpdated: (state) => {
        state.pickStation = false;
        state.displayCharging = false;
        state.stations = [];
    },
    setViewTrajectToTrue: state => state.viewTraject = true,
    setViewTrajectToFalse: state => {
        state.viewTraject = false
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}