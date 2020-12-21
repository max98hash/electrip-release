<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="2" sm="12" md="3">
            <Menu/>
          </v-col>

          <v-col cols="10" sm="10" md="9">
            <BaseMapPure/>
          </v-col>
        </v-row>
        <Calendar/>
        <v-row>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from '../components/Menu.vue';
import BaseMapPure from '../components/BaseMapPure.vue';
import Calendar from '../components/Calendar.vue';

export default {
  name: 'Home',
  components: {
    Menu,
    BaseMapPure,
    Calendar,
  } 
}
</script>
