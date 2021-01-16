<template>
    <v-row justify="center">
        <v-date-picker
        class="mb-12"
        v-model="date"
        :show-current="false"
        @change="getDate"
        ></v-date-picker>
    </v-row>
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
    ...mapMutations(['invertCalendarOverlay','setDate','invertCarOverlay','plusPickerStep']),
    getDate(){
        this.setDate(this.date);
        this.plusPickerStep();
        //this.addtraject(this.getUserId);
        //this.invertCalendarOverlay();
        //this.fetchCars(this.getUserId)
        //this.invertCarOverlay();
    }
  },
}
</script>