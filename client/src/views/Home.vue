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
            <v-card
              class="fill-height rounded-lg"
              elevation="2"
            >
            <v-container
            class="fill-height"
            >
              <v-row justify="center"
            align="center">
                <h1>
                Pas encore de trajets
                </h1>
                <v-icon
                      x-large
                      right
                      dark
                      class="pl-3"

                  >
                      mdi-car-off
                </v-icon>
              </v-row>
            </v-container>
            </v-card>
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

export default {
  name: 'Home',
  components: {
    Menu,
    BaseMapPure,
    Calendar,
    TrajectsList,
  },
  methods: {
    trajectsIsNull(){
      if(this.$store.state.trajects.trajects==[]){
        return false
      }
      return true
    }
  }
}
</script>
