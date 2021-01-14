const axios = require('axios');

const state = {
    trajects: [
        //{ brand: 'Renault', model: 'Zoé', years: '2019', matriculationNbr: 'XC-24D6-FD', autonomy: '120' },
    ],
    origin: null,
    destination: null,
};

const getters = {
    getTrajects: state => state.cars,
    getOrigin: state => state.origin,
    getDestination: state => state.destination,
};

const actions = {
    /*async fetchTrajects({commit},userId){
        /*const response = await axios.get({
            method: 'GET',
            url: 'http://localhost:3000/cars',
            headers: {
                'Authorization': token
            },
            data: {
                userId: userId
            },
        });
        const response = await axios.get('http://localhost:5555/trajects/user/'+userId);
        console.log("Trajects : "+response.data);
        commit('setTrajects',response.data);
    },*/
    async addtraject({commit},userId){
        const url = 'https://api.mapbox.com/directions/v5/'+
            'mapbox/driving/'+
            state.origin+';'+state.destination+
            '?overview=full&'+
            'annotations=distance&'+
            'geometries=geojson&'+
            'steps=true&'+
            'banner_instructions=true&'+
            'language=fr&'+
            'access_token=pk.eyJ1IjoibWF4aGFzaCIsImEiOiJja2h5dXRoajAwOGpnMnlvaDh1bTEwMDY4In0.k8O0vTEqjd0t6WHOHiS_8A'
        const infos = await axios.get(url);
        console.log(infos.data);
        const waypoints = infos.data.waypoints.length;
        const start = infos.data.waypoints[0].name+" -> "+infos.data.waypoints[waypoints-1].name;
        const trajet = await axios.post('http://localhost:5555/trajects/create',{
            name: start,
            startCoord: infos.data.waypoints[0].location,
            startName: infos.data.waypoints[0].name,
            endCoord: infos.data.waypoints[waypoints-1].location,
            endName: infos.data.waypoints[waypoints-1].name,
            userId: userId,
            distance: infos.data.routes[0].distance,
            coordinates: infos.data.routes[0].geometry.coordinates,
        });
        console.log(trajet.data);
        commit('newTraject',trajet.data);
    }
};

const mutations = {
    setTrajects: (state, trajects) => state.trajects = trajects,
    setDestination: (state, destination) => state.destination = destination,
    setOrigin: (state, origin) => state.origin = origin,
    newTraject: (state, traject) => state.trajects.push(traject),
};

export default {
    state,
    getters,
    actions,
    mutations,
}