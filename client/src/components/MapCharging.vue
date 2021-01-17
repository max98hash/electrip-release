<template>
    <div id="mapCharging" class="basemap">
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { busMap } from '../main';

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

    busMap.$on('displayCharging', (idTraject) => {
      this.setDisplayChargingTrue();
      console.log('display charging '+idTraject);
    })
    
    return map;
  },
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