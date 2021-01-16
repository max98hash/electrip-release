const axios = require('axios');

const state = {
    trajects: [
        /*{ 
            _id: "4654revze5r48vzc6z54f89",
            name: "Bordeaux -> Castres",
            startCoord: [-0.579027, 44.837638],
            startName: "Place Rohan",
            endCoord: [2.24, 43.605831],
            endName: "Rue Émile Zola",
            userId: "6001a58a2e36c0002ba9b284",
            distance: 312980.688,
            date: "2021-01-15",
            carId: "90949a02ba9b284",
            carName: "Nissan Juke"
        },
        { 
            _id: "4654revze5r48vzc6z54f89",
            name: "Madrid -> Zaragoza",
            startCoord: [-0.579027, 44.837638],
            startName: "Place Rohan",
            endCoord: [2.24, 43.605831],
            endName: "Rue Émile Zola",
            userId: "6001a58a2e36c0002ba9b284",
            distance: 312980.688,
            date: "2021-02-05",
            carId: "90949a02ba9b284",
            carName: "Nissan Juke"
        },*/
    ],
    trajectsSelected: [],
    origin: null,
    destination: null,
    originName: null,
    destinationName: null,
    calendarOverlay: false,
    date: null,
    carOverlay: false,
    carId: null,
    carName: null,
    picker: false,
    pickerStep: 1,
    map: null,
    startDate: null,
    endDate: null,
    allTrajects: false,
    trajectsButFiltered: true,
};

const getters = {
    getTrajects: state => state.trajects,
    getOrigin: state => state.origin,
    getDestination: state => state.destination,
    getOriginName: state => state.originName,
    getDestinationName: state => state.destinationName,
    getCalendarOverlay: state => state.calendarOverlay,
    getCarOverlay: state => state.carOverlay,
    getCarName: state => state.carName,
    getDate: state => state.date,
    getTrajectPicker: state => state.picker,
    getPickerStep: state => state.pickerStep,
    getMap: state => state.map,
    getTrajectsSelected: state => state.trajectsSelected,
    getStartDate: state => state.startDate,
    getEndDate: state => state.endDate,
    getAllTrajects: state => state.allTrajects,
};

const actions = {
    /*async fetchTrajects({commit},userId){
        const response = await axios.get({
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
    async fetchTrajects({commit},userId){
        console.log("fetchTrajects")
        console.log("userId before request "+userId)
        /*const req = await axios.get({
            method: 'GET',
            url: 'http://localhost:5555/trajects/user/'+userId,
            data: {
                userId: userId
            },
        });*/
        if(userId!=null){
            state.trajectsButFiltered=true;
            const req = await axios.get('http://localhost:5555/trajects/user/'+userId);
            console.log("Data length");
            console.log(req.data.length);
            if(state.allTrajects){
                console.log("All trajects : on affiche tous les trajets")
                console.log(req.data)
                commit('setTrajects',req.data);
            }else{
                let newTrajects = [];
                console.log("Specific dates selected : "+state.startDate+" to "+state.endDate)
                if(state.startDate==state.endDate){
                    newTrajects = req.data.filter(traject => traject.date==state.startDate);
                }else{
                    newTrajects = req.data.filter(traject => new Date(traject.date) >= new Date(state.startDate) && new Date(traject.date) <= new Date(state.endDate));
                }
                console.log(newTrajects)
                commit('setTrajects',newTrajects);
            } 
        }else{
            state.trajectsButFiltered=false;
        }

    },
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
        const waypoints = infos.data.waypoints.length;
        const origin = state.originName.split(',')[0];
        const destination = state.destinationName.split(',')[0];
        const label = origin+" -> "+destination;
        console.log(infos);
        const payload = {
            name: label,
            startCoord: infos.data.waypoints[0].location,
            startName: infos.data.waypoints[0].name != "" ? infos.data.waypoints[0].name : origin,
            endCoord: infos.data.waypoints[waypoints-1].location,
            endName: infos.data.waypoints[waypoints-1].name != "" ? infos.data.waypoints[waypoints-1].name : destination,
            userId: userId,
            distance: infos.data.routes[0].distance,
            date: state.date,
            carId: state.carId,
            carName: state.carName,
            _id: "45zEFcae5fzf5efv86"
            //coordinates: infos.data.routes[0].geometry.coordinates,
        }
        console.log(payload);
        const trajet = await axios.post('http://localhost:5555/trajects/create',payload);
        console.log(trajet);
        commit('newTraject',trajet.data);
    },
    filterSelectedTrajects({commit}){
        let filteredTrajects = [];
        if(state.startDate==state.endDate){
            filteredTrajects = state.trajects
                .filter(traject => traject.date==state.startDate)
                .map(traject => { return {
                    name: traject.name,
                    start: state.startDate,
                    color: 'blue',
                }})
        }else{
            let trajectsInBetween = state.trajects.filter(traject => new Date(traject.date) >= new Date(state.startDate) && new Date(traject.date) <= new Date(state.endDate))
            filteredTrajects = trajectsInBetween.map(traject => { return {
                    name: traject.name,
                    start: traject.date,
                    color: 'blue',
                }})
        }
        commit('setTrajectsSelected',filteredTrajects);
    },
    /*async sortTrajects({commit}){
        let trajectsBefore = state.trajects;
        let filteredTrajects = [];
        if(state.startDate==state.endDate){
            filteredTrajects = state.trajects
                .filter(traject => traject.date==state.startDate)
                .map(traject => { return {
                    name: traject.name,
                    start: state.startDate,
                    color: 'blue',
                }})
        }else{
            let trajectsInBetween = state.trajects.filter(traject => new Date(traject.date) >= new Date(state.startDate) && new Date(traject.date) <= new Date(state.endDate))
            filteredTrajects = trajectsInBetween.map(traject => { return {
                    name: traject.name,
                    start: traject.date,
                    color: 'blue',
                }})
        }
    }*/
};

const mutations = {
    setTrajects: (state, trajects) => state.trajects = trajects,
    setDestination: (state, destination) => state.destination = destination,
    setOrigin: (state, origin) => state.origin = origin,
    setDate: (state, date) => state.date = date,
    setOriginName: (state, originName) => state.originName = originName,
    setDestinationName: (state, destinationName) => state.destinationName = destinationName,
    newTraject: (state, traject) => {
        state.trajects.push(traject)
        state.origin = null;
        state.destination = null;
        state.date = null;
        state.calendarOverlay = false;
        state.originName = null;
        state.destinationName = null;
        state.carId = null;
        state.carName = null;
    },
    invertCalendarOverlay: state => state.calendarOverlay=!state.calendarOverlay,
    invertCarOverlay: state => state.carOverlay=!state.carOverlay,
    invertTrajectPicker: state => state.picker=!state.picker,
    setCar: (state, carId) => state.carId = carId,
    setCarName: (state, carName) => state.carName = carName,
    plusPickerStep: state => state.pickerStep = state.pickerStep+1,
    minusPickerStep: state => state.pickerStep = state.pickerStep-1,
    initPickerStep: state => state.pickerStep = 1,
    setMap: (state, map) => state.map = map,
    setTrajectsSelected: (state, trajectsFiltered) => state.trajectsSelected = trajectsFiltered,
    setStartDate: (state, start) => state.startDate = start,
    setEndDate: (state, end) => state.endDate = end,
    setAllTrajectsToFalse: state => state.allTrajects = false,
    setAllTrajectsToTrue: state => state.allTrajects = true,
};

export default {
    state,
    getters,
    actions,
    mutations,
}