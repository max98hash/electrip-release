<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="2" >
            <Menu/>
          </v-col>

          <v-col cols="12" sm="10">
            <CarsList/>
          </v-col>
        </v-row>
        <v-row>
            <v-col>
                
            </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from '../components/Menu.vue';
import CarsList from '../components/CarsList';

export default {
  name: 'Cars',
  components: {
    Menu,
    CarsList,
  } 
}
</script>
