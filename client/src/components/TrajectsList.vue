<template>
    <v-expansion-panels>
        <v-expansion-panel v-for="traject in trajects" v-bind:key="traject.name">
        <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters>
            <v-col cols="4">
                {{ traject.name }}
            </v-col>
            <v-col
                cols="8"
                class="text--secondary"
            >
                <v-fade-transition leave-absolute>
                <span v-if="open">Details</span>
                <v-row
                    v-else
                    no-gutters
                    style="width: 100%"
                >
                    <v-col cols="6">
                    Distance: {{ Math.round(traject.distance * 0.01) / 10 || 'Not set' }} km
                    </v-col>
                    <v-col cols="6">
                    Charges: {{ traject.stations || 'Not set' }}
                    </v-col>
                </v-row>
                </v-fade-transition>
            </v-col>
            </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-row
            justify="center"
            no-gutters
            class="pb-2"
            >
            <v-col cols="12" md="3">
                <v-icon
                    right
                    dark
                >
                    mdi-map-marker
                </v-icon>
                Origin : {{ traject.startName || 'Not set' }}
            </v-col>
            <v-col cols="12" md="3">
                <v-icon
                    right
                    dark
                >
                    mdi-map-marker-check
                </v-icon>
                Destination : {{ traject.endName || 'Not set' }}
            </v-col>
            <v-col cols="12" md="3">
                <v-icon
                    right
                    dark
                >
                    mdi-car-electric
                </v-icon>
                Car : {{ traject.carName || 'Not set' }}
            </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row
            justify="center"
            no-gutters
            class="pt-3"
            >
            <v-col cols="12" md="5" class="pb-2">
                <v-btn
                    depressed
                    color="primary"
                    :id="traject._id"
                    @click="showButton($event)"
                >
                <v-icon
                    right
                    dark
                    class="pr-6"
                >
                    mdi-card-search
                </v-icon>

                    View traject
                </v-btn>
            </v-col>

            <v-col cols="12" md="5">
                <v-btn
                    depressed
                    color="indigo"
                    :id="traject._id"
                    @click="showButton($event)"
                >
                <v-icon
                    right
                    dark
                    class="pr-6"
                >
                    mdi-ev-station
                </v-icon>
                    Find charging stations
                </v-btn>
            </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    data: function () {
        return {
      date: null,
      trajects: this.$store.state.trajects.trajects,
    }},
    computed: mapGetters(['getCarName']),
    methods: {
        ...mapMutations(['setCarName']),
        ...mapActions(['fetchTrajects','addtraject']),
        showButton(event){
            console.log(event.currentTarget.id)
        }
    },
    mounted(){
        //console.log(this.$store.state.trajects.trajects);
    }
}
</script>