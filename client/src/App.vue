<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="2" sm="12" md="3">
            <Menu/>
          </v-col>

          <v-col cols="10" sm="9" md="9">
            <BaseMapPure/>
          </v-col>
        </v-row>
        <v-row>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue';
import BaseMapPure from './components/BaseMapPure.vue';

export default {
  name: 'Home',
  components: {
    Menu,
    BaseMapPure
  } 
}
</script>
