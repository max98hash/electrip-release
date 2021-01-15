<template>
    <div id="mapContainer" class="basemap">
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: "BaseMap",
  data() {
    return {
      accessToken: 'pk.eyJ1IjoibWF4aGFzaCIsImEiOiJja2h5dXRoajAwOGpnMnlvaDh1bTEwMDY4In0.k8O0vTEqjd0t6WHOHiS_8A',
    };
  },
  computed: mapGetters(['getOrigin','getDestination','getUserId','getCalendarOverlay']),
  methods: {
    ...mapMutations(['setOrigin','setDestination','invertCalendarOverlay','setOriginName','setDestinationName']),
    ...mapActions(['fetchTrajects','addtraject']),
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    var map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-0.5699646394694645, 44.84141874890935],
      zoom: 12,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl());

    // Add geolocate control to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        })
    );

    let directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving'
    });

    directions.on('route',() => {
      if(this.getCalendarOverlay==false || this.getCalendarOverlay==null){
        const inputs = document.getElementsByTagName('input');
        this.setOriginName(inputs[0].value);
        this.setDestinationName(inputs[1].value);
        this.setDestination(directions.getDestination().geometry.coordinates.toString());
        this.setOrigin(directions.getOrigin().geometry.coordinates.toString());
        this.invertCalendarOverlay();
      }
    })

    map.addControl(directions,
    'top-left'
    );
    
    return map;
  },
};
</script>

<style scoped>
.basemap {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
</style>