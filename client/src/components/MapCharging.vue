<template>
    <div id="mapCharging" class="basemap">
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { busMap } from '../main';
import axios from 'axios';

export default {
  name: "BaseMap",
  data() {
    return {
      accessToken: 'pk.eyJ1IjoibWF4aGFzaCIsImEiOiJja2h5dXRoajAwOGpnMnlvaDh1bTEwMDY4In0.k8O0vTEqjd0t6WHOHiS_8A',
    };
  },
  computed: mapGetters(['getOrigin','getMapCharging','getMarkers','getMarkersCharging','getClickStation','getDisplayCharging','getViewtraject','getToken']),
  methods: {
    ...mapMutations(['setOrigin','setDisplayChargingTrue','setMap','setMarkers','setMarkersCharging','addOrRemoveStation','setPickStationToTrue','setClickStationInvert','setTrajectInModification','setViewTrajectToTrue','setViewTrajectToFalse']),
    ...mapActions(['fetchTrajects']),
    async getTrajectGEOJSON(trajectId){
        const trajectBD = await axios.get('http://localhost:5555/trajects/'+trajectId,{
                headers: {
                'x-access-token': this.getToken
                }
            });
        let startCoord = trajectBD.data.startCoord;
        let endCoord = trajectBD.data.endCoord;
        this.setTrajectInModification(trajectBD.data._id);
        const url = 'https://api.mapbox.com/directions/v5/'+
            'mapbox/driving/'+
            startCoord[0]+','+startCoord[1]+';'+endCoord[0]+','+endCoord[1]+'?'+
            'geometries=geojson&'+
            'access_token=pk.eyJ1IjoibWF4aGFzaCIsImEiOiJja2h5dXRoajAwOGpnMnlvaDh1bTEwMDY4In0.k8O0vTEqjd0t6WHOHiS_8A'
        const trajectMapbox = await axios.get(url);
        trajectMapbox.data.carId=trajectBD.data.carId
        return trajectMapbox
    },
    async getCarFromBD(carId){
        return await axios.get('http://localhost:3000/cars/'+carId,{ headers : { 'x-access-token': this.getToken }})
    },
    rad(x){
        return x * Math.PI / 180;
    },
    getDistance(p1,p2){
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = this.rad(p2[0] - p1[0]);
        var dLong = this.rad(p2[1] - p1[1]);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(p1[0])) * Math.cos(this.rad(p2[0])) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d*0.001; // returns the distance in km
    },
    getChargingCoordinates(nbPoints,distance,carAutonomy,coordinates){
        let chargingCoordinates = [];
        for (let index = 0; index < nbPoints; index+carAutonomy) {
            index = index + Math.round((nbPoints/distance)*carAutonomy)
            chargingCoordinates.push(index);
        }
        chargingCoordinates.pop();

        let points = coordinates;
        let kmSinceLastCharge = 0;
        let coordCharging = [];
        let lastPoint = points[0];
        for (let index = 1; index < nbPoints; index++) {
            if( kmSinceLastCharge + this.getDistance(points[index],lastPoint) >= carAutonomy-10){
                coordCharging.push(lastPoint);
                kmSinceLastCharge = this.getDistance(points[index],lastPoint);
                lastPoint = points[index]
            }else{
                kmSinceLastCharge = kmSinceLastCharge + this.getDistance(points[index],lastPoint);
                lastPoint = points[index]
            }
        }

        return coordCharging;
    },
    resetChargingMarkers(){
        let oldMarkersCharging = this.getMarkersCharging;
        oldMarkersCharging.forEach(function(marker){
            marker.remove()
        })
    },
    resetMarkers(){
        let oldMarkers = this.getMarkers;
        oldMarkers.forEach(function(marker){
            marker.remove()
        })
    },
    async displayCharging(trajectId){
        const mapboxTraject = await this.getTrajectGEOJSON(trajectId);
        const distance = Math.round((mapboxTraject.data.routes[0].distance)*0.001)
        const nbPoints = mapboxTraject.data.routes[0].geometry.coordinates.length;
        const car = await this.getCarFromBD(mapboxTraject.data.carId)

        const coordCharging = this.getChargingCoordinates(nbPoints,distance,car.data.autonomy,mapboxTraject.data.routes[0].geometry.coordinates)

        this.resetChargingMarkers();
        this.resetMarkers();

        await this.displayLayout(coordCharging,mapboxTraject.data.routes[0].geometry,mapboxTraject.data.routes[0].geometry.coordinates)
        const geojson = await this.searchChargingStations(coordCharging);
        this.displayerMarkersChargingClusterVersion(geojson);
        this.setPickStationToTrue();

    },
    async searchChargingStations(coordCharging){

        var geojson = {
            type: 'FeatureCollection',
            features: []
        };

        for (let index = 0; index < coordCharging.length; index++) {

            const chargePoint = await axios.get('https://api.openchargemap.io/v3/poi/?output=json&latitude='+coordCharging[index][1]+'&longitude='+coordCharging[index][0]+'&distance=10&distanceunit=KM&compact=true')

            chargePoint.data.forEach(function(station){
                const address = station.AddressInfo.AddressLine1
                const access = station.AddressInfo.AccessComments
                const title = station.AddressInfo.Title
                const lat = station.AddressInfo.Latitude
                const long = station.AddressInfo.Longitude
                const comments = station.GeneralComments
                const stationJSON = {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [long,lat]
                    },
                    properties: {
                        title,
                        access,
                        address,
                        comments
                    }
                }
                let alreadyExists = false
                for (var i=0; i<geojson.features.length; i++) { //iterate through each object in an array
                    if (JSON.stringify(geojson.features[i]) === JSON.stringify(stationJSON) ) {
                            alreadyExists = true;
                            break;
                    }
                }
                if(!alreadyExists){
                    geojson.features.push(stationJSON)
                }
            })
            
        }

        return geojson;



    },
    async displayerMarkersChargingClusterVersion(stations){

        let map = this.getMapCharging;

        this.removeClusterLayer()

        map.addSource('stations', {
            type: 'geojson',
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data: stations,
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'stations',
            filter: ['has', 'point_count'],
            paint: {
                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#51bbd6',
                    3,
                    '#f1f075',
                    10,
                    '#f28cb1',
                    20,
                    '#f5a73b'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    3,
                    30,
                    10,
                    35,
                    20,
                    40
                ]
            }
        });

        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'stations',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 20
            }
        });

        map.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'stations',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#11b4da',
                'circle-radius': 10,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
            }
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.on('click', 'unclustered-point', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            
            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            let properties = e.features[0].properties

            properties['coordinates']=coordinates;

            busMap.$emit('station',properties);
            
            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML('<h3>' + properties.title + '</h3><p>' + properties.access + '</p><p>' + properties.address + '</p><p>' + properties.comments + '</p>')
            .addTo(map);
        });

        map.on('mouseenter', 'clusters', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', function () {
            map.getCanvas().style.cursor = '';
        });

    },
    displayLayout(coordCharging,geometry,coordinates){

        if(!this.getViewtraject){
            var markers = {
                type: 'FeatureCollection',
                features: []
            }
            for(const index in coordCharging){
                markers.features.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: coordCharging[index]
                    }
                })
            }
        }

        let map = this.getMapCharging;

        this.removeLineLayer()

        map.addSource('LineString', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'properties': {},
                    'type': geometry.type,
                    'coordinates': geometry.coordinates
                }
            }
        });
        map.addLayer({
                'id': 'LineString',
                'type': 'line',
                'source': 'LineString',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#428af5',
                    'line-opacity': 0.8,
                    'line-width': 10
                }
        });

        var bounds = coordinates.reduce(function (bounds, coord) {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
        
        map.fitBounds(bounds, {
            padding: 20
        });

        if(this.getViewtraject){
            this.displayMarkersChargingIcon(coordCharging)
        }else{
            this.displayMarkers(markers)
        }
    },
    displayMarkers(markers){

        let map = this.getMapCharging;

        let newMarkers = []

        markers.features.forEach(function(marker) {

            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';

            // make a marker for each feature and add to the map
            let markerMapbox = new mapboxgl.Marker()
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);

            newMarkers.push(markerMapbox)
        
        });

        this.setMarkers(newMarkers);

    },
    displayMarkersChargingIcon(stations){
        var markers = {
            type: 'FeatureCollection',
            features: []
        }
        stations.forEach(function(station){
            markers.features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: station.coordinates
                }
            })
        })

        let map = this.getMapCharging;

        let newMarkers = []

        markers.features.forEach(function(marker) {

            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';

            // make a marker for each feature and add to the map
            let markerMapbox = new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);

            newMarkers.push(markerMapbox)
        
        });

        this.setMarkers(newMarkers);
    },
    removeClusterLayer(){
        let map = this.getMapCharging;

        if (map.getLayer('clusters')){
            map.removeLayer('clusters');
        }
        if(map.getLayer('cluster-count')){
            map.removeLayer('cluster-count');
        }
        if(map.getLayer('unclustered-point')){
            map.removeLayer('unclustered-point');
        }
        if (map.getSource('stations')) {
            map.removeSource('stations');
        }
    },
    removeLineLayer(){
        let map = this.getMapCharging;
        
        if (map.getLayer('LineString')) {
            map.removeLayer('LineString');
        }
        if (map.getSource('LineString')) {
            map.removeSource('LineString');
        }

        this.resetMarkers();
    },
    async showTraject(trajectId){
        const traject = await axios.get('http://localhost:5555/trajects/'+trajectId,{
                headers: {
                'x-access-token': this.getToken
                }
            });
        let stations = traject.data.stations;
        /*traject.data.stations.forEach(function(station){
            stations.push(station)
        })*/

        let coordinates = traject.data.startCoord[0]+','+traject.data.startCoord[1]+';'
        stations.forEach(function(station){
            coordinates = coordinates+station.coordinates[0]+','+station.coordinates[1]+';'
        })
        coordinates = coordinates+traject.data.endCoord[0]+','+traject.data.endCoord[1]

        console.log(coordinates);

        const url = 'https://api.mapbox.com/directions/v5/'+
            'mapbox/driving/'+
            coordinates+'?'+
            'geometries=geojson&'+
            'access_token=pk.eyJ1IjoibWF4aGFzaCIsImEiOiJja2h5dXRoajAwOGpnMnlvaDh1bTEwMDY4In0.k8O0vTEqjd0t6WHOHiS_8A'
        const trajectMapbox = await axios.get(url);
        this.displayLayout(stations,trajectMapbox.data.routes[0].geometry,trajectMapbox.data.routes[0].geometry.coordinates);
    }

  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    var map = new mapboxgl.Map({
      container: "mapCharging",
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-0.5699646394694645, 44.84141874890935],
      zoom: 12,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl());

    // Add geolocate control to the map.s
    map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        })
    );

    this.setMap(map)

    return map;
  },
  created(){
    busMap.$on('displayCharging' ,(idTraject) => {
        this.setDisplayChargingTrue();
        this.displayCharging(idTraject);
    })
    busMap.$on('station' ,(station) => {
        this.setClickStationInvert()
        if(this.getClickStation){
           console.log("Station cliquée")
            this.addOrRemoveStation(station); 
        }
    })
    busMap.$on('showTraject' ,(idTraject) => {
        this.setDisplayChargingTrue();
        this.setViewTrajectToTrue();
        this.showTraject(idTraject);
    })
  }
};
</script>

<style scoped>
.basemap {
  width: 100%;
  height: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
</style>