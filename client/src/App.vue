<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="2">
            <Menu/>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
              elevation="12"
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue';

export default {
  name: 'Home',
  components: {
    Menu
  } 
}
</script>
