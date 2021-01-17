<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="3" justify="center">
            <Menu/>
          </v-col>

          <v-col v-if="this.$store.state.map.displayCharging" cols="12" md="9">
            <MapCharging/>
          </v-col>
          <v-col v-else cols="12" md="9">
            <BaseMapPure/>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" lg="4">
            <Calendar/>
          </v-col>
          <v-col v-if="this.$store.state.trajects.picker" cols="12" lg="7" class="mt-2">
            <TrajectPicker/>
          </v-col>
          <v-col v-else-if="this.$store.state.trajects.trajectsButFiltered" cols="12" lg="7" >
            <CarsTrajects/>
          </v-col>
          <v-col cols="12" lg="7" v-else>
            <NoTrajects/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import { mapGetters } from 'vuex';
import Menu from '../components/Menu.vue';
import BaseMapPure from '../components/BaseMapPure.vue';
import Calendar from '../components/Calendar.vue';
//import TrajectsList from '../components/TrajectsList.vue';
import NoTrajects from '../components/NoTrajects';
import TrajectPicker from '../components/TrajectPicker';
import CarsTrajects from '../components/CarsTrajects';
import MapCharging from  '../components/MapCharging';

export default {
  name: 'Home',
  components: {
    Menu,
    BaseMapPure,
    Calendar,
    CarsTrajects,
    NoTrajects,
    TrajectPicker,
    MapCharging,
  },
  methods: {
    trajectsIsNull(){
      if(this.$store.state.trajects.trajects==""){
        return false
      }
      return true
    }
  }
}
</script>
