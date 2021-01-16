<template>
    <v-row justify="center">
        <v-col>
          <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          width="290px"
        >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="getDate"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'LoginOverlay',
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
  }),
  computed: mapGetters(['getCalendarOverlay','getUserId']),
  methods: {
    ...mapActions(['login','register','addtraject','fetchCars']),
    ...mapMutations(['invertCalendarOverlay','setDate','invertCarOverlay','plusPickerStep']),
    getDate(){
        this.setDate(this.date);
        console.log(this.date)
        this.modal=false;
        this.plusPickerStep();
        //this.addtraject(this.getUserId);
        //this.invertCalendarOverlay();
        //this.fetchCars(this.getUserId)
        //this.invertCarOverlay();
    }
  },
}
</script>