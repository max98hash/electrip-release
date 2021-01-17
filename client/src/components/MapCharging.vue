<template>
    <div id="mapCharging" class="basemap">
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { busMap } from '../main';
import axios from 'axios';
//import map from '../store/modules/map';

export default {
  name: "BaseMap",
  data() {
    return {
      accessToken: 'pk.eyJ1IjoibWF4aGFzaCIsImEiOiJja2h5dXRoajAwOGpnMnlvaDh1bTEwMDY4In0.k8O0vTEqjd0t6WHOHiS_8A',
    };
  },
  computed: mapGetters(['getOrigin','getMapCharging']),
  methods: {
    ...mapMutations(['setOrigin','setDisplayChargingTrue','setMap']),
    ...mapActions(['fetchTrajects']),
    async getTrajectGEOJSON(trajectId){
        const trajectBD = await axios.get('http://localhost:5555/trajects/'+trajectId);
        let startCoord = trajectBD.data.startCoord;
        let endCoord = trajectBD.data.endCoord;
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
        return await axios.get('http://localhost:3000/cars/'+carId)
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
            if( kmSinceLastCharge + this.getDistance(points[index],lastPoint) >= carAutonomy){
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
    async displayCharging(trajectId){
        const mapboxTraject = await this.getTrajectGEOJSON(trajectId);
        const distance = Math.round((mapboxTraject.data.routes[0].distance)*0.001)
        const nbPoints = mapboxTraject.data.routes[0].geometry.coordinates.length;
        const car = await this.getCarFromBD(mapboxTraject.data.carId)

        const coordCharging = this.getChargingCoordinates(nbPoints,distance,car.data.autonomy,mapboxTraject.data.routes[0].geometry.coordinates)

        console.log('coordcharging')
        console.log(coordCharging)

        this.displayLayout(coordCharging,mapboxTraject.data.routes[0].geometry,mapboxTraject.data.routes[0].geometry.coordinates)

    },
    displayLayout(coordCharging,geometry,coordinates){
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

        let map = this.getMapCharging;

        if (map.getLayer('LineString')) {
            map.removeLayer('LineString');
            console.log("Layer Removed")
        }
        if (map.getSource('LineString')) {
            map.removeSource('LineString');
            console.log("Source Removed")
        }

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

        this.displayMarkers(markers)
    },
    displayMarkers(markers){
            let map = this.getMapCharging;
            markers.features.forEach(function(marker) {

            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';

            // make a marker for each feature and add to the map
            new mapboxgl.Marker()
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
        });
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