<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="3" justify="center">
            <Menu/>
          </v-col>

          <v-col cols="12" md="9">
            <BaseMapPure/>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" lg="4">
            <Calendar/>
          </v-col>
          <v-col v-if="trajectsIsNull()" cols="12" lg="7" >
            <TrajectsList/>
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
import Menu from '../components/Menu.vue';
import BaseMapPure from '../components/BaseMapPure.vue';
import Calendar from '../components/Calendar.vue';
import TrajectsList from '../components/TrajectsList.vue';
import NoTrajects from '../components/NoTrajects';

export default {
  name: 'Home',
  components: {
    Menu,
    BaseMapPure,
    Calendar,
    TrajectsList,
    NoTrajects,
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
