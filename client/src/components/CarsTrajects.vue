<template>
    <v-card>
    <v-toolbar
      flat
      color="primary"
      dark
    >
      <v-toolbar-title>Your Profile</v-toolbar-title>
    </v-toolbar>
    <v-tabs grow>
      <v-tab>
        <v-icon left>
          mdi-map-search
        </v-icon>
        Trajects
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-car-electric
        </v-icon>
        Cars
      </v-tab>

      <v-tab-item>
        <TrajectsList/>
      </v-tab-item>
      <v-tab-item>
        <CarsList/>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import TrajectsList from './TrajectsList';
import CarsList from './CarsList';

export default {
    name: "CarsTrajects",
    components: {
        TrajectsList,
        CarsList,
    }
    
}
</script>