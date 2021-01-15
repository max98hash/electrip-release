<template>
    <v-overlay
        :value="getCalendarOverlay"
    >
    <v-row>
        <v-date-picker
        v-model="date"
        :show-current="false"
        @change="getDate"
        ></v-date-picker>
    </v-row>
    <v-row>
        <v-btn
        elevation="2"
        rounded
        @click="invertCalendarOverlay"
        >
            Back
        </v-btn>
    </v-row>
    </v-overlay>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'LoginOverlay',
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
  }),
  computed: mapGetters(['getCalendarOverlay','getUserId']),
  methods: {
    ...mapActions(['login','register','addtraject','fetchCars']),
    ...mapMutations(['invertCalendarOverlay','setDate','invertCarOverlay']),
    getDate(){
        this.setDate(this.date);
        //this.addtraject(this.getUserId);
        this.invertCalendarOverlay();
        this.fetchCars(this.getUserId)
        this.invertCarOverlay();
    }
  },
}
</script>