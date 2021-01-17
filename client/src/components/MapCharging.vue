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
  computed: mapGetters(['getOrigin']),
  methods: {
    ...mapMutations(['setOrigin','setDisplayChargingTrue']),
    ...mapActions(['fetchTrajects']),
    async getTrajectGEOJSON(trajectId){
        const trajectBD = await axios.get('http://localhost:5555/trajects/'+trajectId);
        //console.log("Traject en bd :")
        //console.log(trajectBD.data);
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
    async displayCharging(trajectId){
        const mapboxTraject = await this.getTrajectGEOJSON(trajectId);
        console.log(mapboxTraject.data)
        //console.log("Distance en km : ");
        const distance = Math.round((mapboxTraject.data.routes[0].distance)*0.001)
        //console.log(distance)
        //console.log("GeoJSON : ");
        //console.log(mapboxTraject.data.routes[0].geometry)
        const nbPoints = mapboxTraject.data.routes[0].geometry.coordinates.length;
        console.log("Nb de points : "+nbPoints)
        console.log("Nb de points par km : "+nbPoints/distance)
        const car = await this.getCarFromBD(mapboxTraject.data.carId)
        console.log(car)
        let chargingCoordinates = [];
        for (let index = 0; index < nbPoints; index+car.data.autonomy) {
            index = index + Math.round((nbPoints/distance)*car.data.autonomy)
            chargingCoordinates.push(index);
        }
        chargingCoordinates.pop();
        console.log(chargingCoordinates);
        
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

    
    return map;
  },
  created(){
    busMap.$on('displayCharging' ,(idTraject) => {
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