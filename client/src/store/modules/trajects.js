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
    events: [
        {
            name: "Vacances",
            start: "2021-01-19",
            end: "2021-01-26",
            color: "orange",
            timed: false,
            category: "Famille"
        },
        {
            name: "Rdv",
            start: "2021-01-12",
            color: "pink",
            timed: false,
            category: "Travail"
        }
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
    allEvents: false,
    pickerEvents: false,
    pickerEventStep: 1,
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
    getEvents: state => state.events,
    getAllEvents: state => state.getAllEvents,
    getPickerEvents: state => state.pickerEvents,
    getPickerEventStep: state => state.pickerEventStep,
};

const actions = {
    async deleteTraject({commit},{trajectId, token}){
        const response = await axios.delete('http://localhost:5555/trajects/'+trajectId,{
            headers: {
            'x-access-token': token
            }
        });
        console.log("Traject deleted : ");
        console.log(response.data)
        commit('setAfterRemoveTraject',trajectId);
    },
    async deleteEvent({commit},{eventId, token}){
        const response = await axios.delete('http://localhost:7777/activities/'+eventId,{
            headers: {
            'x-access-token': token
            }
        });
        console.log("Event deleted : ");
        console.log(response.data)
        commit('setAfterRemoveEvent',eventId);
    },
    async fetchTrajects({commit},token){
        console.log("fetchTrajects")
        /*const req = await axios.get({
            method: 'GET',
            url: 'http://localhost:5555/trajects/user/'+userId,
            data: {
                userId: userId
            },
        });*/
        if(token!=null){
            state.trajectsButFiltered=true;
            const req = await axios.get('http://localhost:5555/trajects/',{
                headers: {
                'x-access-token': token
                }
            });
            if(state.allTrajects){
                req.data.sort(function custom_sort(traject1, traject2) {
                    return new Date(traject1.date).getTime() - new Date(traject2.date).getTime();
                });
                commit('setTrajects',req.data);
            }else{
                let newTrajects = [];
                if(state.startDate==state.endDate){
                    newTrajects = req.data.filter(traject => traject.date==state.startDate);
                }else{
                    newTrajects = req.data.filter(traject => new Date(traject.date) >= new Date(state.startDate) && new Date(traject.date) <= new Date(state.endDate));
                }
                newTrajects.sort(function custom_sort(traject1, traject2) {
                    return new Date(traject1.date).getTime() - new Date(traject2.date).getTime();
                });
                commit('setTrajects',newTrajects);
            } 
        }else{
            state.trajectsButFiltered=false;
        }

    },
    async addtraject({commit},token){
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
            distance: infos.data.routes[0].distance,
            date: state.date,
            carId: state.carId,
            carName: state.carName,
            stations: [],
        }
        console.log(payload);
        const trajet = await axios.post('http://localhost:5555/trajects/create',payload,{
            headers: {
            'x-access-token': token
            }
        });
        console.log(trajet);
        commit('newTraject',trajet.data);
    },
    async fetchEvents({commit},token){
        console.log('fetchEvents')
        if(token!=null){
            state.trajectsButFiltered=true;
            const req = await axios.get('http://localhost:7777/activities/',{
                headers: {
                'x-access-token': token
                }
            });
            if(state.allEvents){
                req.data.sort(function custom_sort(event1, event2) {
                    return new Date(event1.start).getTime() - new Date(event2.start).getTime();
                });
                commit('setEvents',req.data);
            }else{
                let newEvents = [];
                if(state.startDate==state.endDate){
                    newEvents = req.data.filter(event => event.start==state.startDate);
                }else{
                    newEvents = req.data.filter(event => new Date(event.start) >= new Date(state.startDate) && new Date(event.start) <= new Date(state.endDate));
                }
                newEvents.sort(function custom_sort(event1, event2) {
                    return new Date(event1.start).getTime() - new Date(event2.start).getTime();
                });
                commit('setEvents',newEvents);
            } 
        }else{
            state.trajectsButFiltered=false;
        }
    },
    async addEvent({commit},{token,event}){
        console.log("event")
        console.log(event)
        const returnedEvent = await axios.post('http://localhost:7777/activities/create',event,{
            headers: {
            'x-access-token': token
            }
        });
        console.log(returnedEvent);
        commit('newEvent',returnedEvent.data);
    },
    filterSelectedTrajects({commit}){
        let filteredTrajects = [];
        let filteredEvents = [];
        if(state.startDate==state.endDate){
            filteredTrajects = state.trajects
                .filter(traject => traject.date==state.startDate)
                .map(traject => { return {
                    name: traject.name,
                    start: state.startDate,
                    color: 'blue',
                }})
            filteredEvents = state.events
                .filter(event => event.start==state.startDate)
                .map(event => {
                    let displayableEvent = {
                        name: event.name,
                        start: event.start,
                    }
                    if(event.end){
                        displayableEvent['end']=event.end;
                    }
                    if(event.category=="Family"){
                        displayableEvent['color']='orange'
                    }
                    else if(event.category=="Work"){
                        displayableEvent['color']='grey'
                    }
                    else if(event.category=="Sport"){
                        displayableEvent['color']='red'
                    }
                    else if(event.category=="Holidays"){
                        displayableEvent['color']='green'
                    }
                    else if(event.category=="Other"){
                        displayableEvent['color']='cyan'
                    }
                    return displayableEvent
                })
        }else{
            let trajectsInBetween = state.trajects.filter(traject => new Date(traject.date) >= new Date(state.startDate) && new Date(traject.date) <= new Date(state.endDate))
            filteredTrajects = trajectsInBetween.map(traject => { return {
                    name: traject.name,
                    start: traject.date,
                    color: 'blue',
                }})
            let eventsInBetween = state.events.filter(event => new Date(event.start) >= new Date(state.startDate) && new Date(event.start) <= new Date(state.endDate))
            filteredEvents = eventsInBetween.map(event => {
                let displayableEvent = {
                    name: event.name,
                    start: event.start,
                }
                if(event.end){
                    displayableEvent['end']=event.end;
                }
                if(event.category=="Family"){
                    displayableEvent['color']='orange'
                }
                else if(event.category=="Work"){
                    displayableEvent['color']='grey'
                }
                else if(event.category=="Sport"){
                    displayableEvent['color']='red'
                }
                else if(event.category=="Holidays"){
                    displayableEvent['color']='green'
                }
                else if(event.category=="Other"){
                    displayableEvent['color']='cyan'
                }
                return displayableEvent
            })
        }
        /*filteredTrajects.push({
            name: "Vacances",
            start: "2021-01-19",
            end: "2021-01-26",
            color: "orange",
            timed: false,
        })
        filteredTrajects.push({
            name: "Rdv",
            start: "2021-01-12",
            color: "pink",
            timed: false,
        })*/
        let toDisplay = filteredTrajects.concat(filteredEvents);
        commit('setTrajectsSelected',toDisplay);
    },
};

const mutations = {
    setTrajects: (state, trajects) => state.trajects = trajects,
    setEvents: (state, events) => state.events = events,
    setDestination: (state, destination) => state.destination = destination,
    setOrigin: (state, origin) => state.origin = origin,
    setDate: (state, date) => state.date = date,
    setOriginName: (state, originName) => state.originName = originName,
    setDestinationName: (state, destinationName) => state.destinationName = destinationName,
    newTraject: (state, traject) => {
        let temp = state.trajects
        temp.push(traject);
        let temp2 = temp.filter(traject => new Date(traject.date) >= new Date(state.startDate) && new Date(traject.date) <= new Date(state.endDate))
        temp2.sort(function custom_sort(traject1, traject2) {
            return new Date(traject1.date).getTime() - new Date(traject2.date).getTime();
        });
        state.trajects = temp2;
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
    setAfterRemoveTraject: (state, trajectId) => {
        let temp = state.trajects;
        temp = state.trajects.filter(traject => traject._id!=trajectId);
        state.trajects = temp;
    },
    setAfterRemoveEvent: (state, eventId) => {
        let temp = state.events;
        temp = state.events.filter(event => event._id!=eventId);
        state.events = temp;
    },
    setAllEventsToFalse: state => state.allEvents = false,
    setAllEventsToTrue: state => state.allEvents = true,
    invertEventPicker: state => state.pickerEvents = !state.pickerEvents,
    minusEventPickerStep: state => state.pickerEventStep = state.pickerEventStep-1,
    plusEventPickerStep: state => state.pickerEventStep = state.pickerEventStep+1,
    initEventPickerStep: state => state.pickerEventStep = 1,
    newEvent: (state, event) => {
        let temp = state.events
        temp.push(event);
        let temp2 = temp.filter(event => new Date(event.start) >= new Date(state.startDate) && new Date(event.start) <= new Date(state.endDate))
        temp2.sort(function custom_sort(event1, event2) {
            return new Date(event1.start).getTime() - new Date(event2.start).getTime();
        });
        state.events = temp2;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}