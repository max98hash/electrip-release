<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="2">
            <Menu/>
          </v-col>

          <v-col>
            <BaseMapPure/>
          </v-col>
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
