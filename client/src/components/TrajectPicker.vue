<template>
  <v-stepper v-model="getPickerStep">
    <v-stepper-header>
      <v-stepper-step
        :complete="getPickerStep > 1"
        step="1"
      >
        Select Car
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="getPickerStep > 2"
        step="2"
      >
        Select Date
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Recap
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
          <CarPicker/>

        <v-btn text @click="invertTrajectPicker">
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <DayPicker/>

        <v-btn text @click="minusPickerStep">
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-row
            justify="center"
            no-gutters
            class="pb-2"
            >
            <v-col cols="12" md="5">
                <v-icon
                    right
                    dark
                >
                    mdi-map-marker
                </v-icon>
                Origin : {{ getOriginName || 'Not set' }}
            </v-col>
            <v-col cols="12" md="5">
                <v-icon
                    right
                    dark
                >
                    mdi-map-marker-check
                </v-icon>
                Destination : {{ getDestinationName || 'Not set' }}
            </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row justify="center">
                <v-col cols="12" md="5" class="mb-12">
                    <v-icon
                        right
                        dark
                    >
                        mdi-car-electric
                    </v-icon>
                    Car : {{ getCarName || 'Not set' }}
                </v-col>
                <v-col cols="12" md="5">
                    <v-icon
                        right
                        dark
                    >
                        mdi-calendar
                    </v-icon>
                    Date : {{ getDate || 'Not set' }}
                </v-col>
            </v-row>

        <v-btn
          color="primary"
          @click="submitTraject"
          class="mr-2"
        >
          Validate
        </v-btn>

        <v-btn text @click="minusPickerStep">
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import CarPicker from './CarPickerLayout';
import DayPicker from './TrajectOverlay';

export default {
    name: "TrajectPicker",
    components: {
        CarPicker,
        DayPicker,
    },
    data:  function () {
        return {
            e1: 1,
        }
    },
    computed: mapGetters(['getPickerStep','getOriginName','getDestinationName','getCarName','getDate','getMap','getUserId','getEndDate','getStartDate','getToken']),
    methods: {
        ...mapActions(['addtraject','fetchCars','filterSelectedTrajects']),
        ...mapMutations(['minusPickerStep','plusPickerStep','invertTrajectPicker','initPickerStep']),
        async submitTraject(){
            const map = this.getMap;
            map.removeRoutes();
            this.invertTrajectPicker();
            this.initPickerStep();
            await this.addtraject(this.getToken);
            this.filterSelectedTrajects();
        },
    }
}
</script>