<template>
    <v-card>
    <v-toolbar
      flat
      color="primary"
      dark
    >
      <v-toolbar-title>Selected Stations</v-toolbar-title>
    </v-toolbar>
    <v-container>
        <v-row>
            <v-expansion-panels>
                <v-expansion-panel v-for="station in getStations" v-bind:key="station.title">
                    <v-expansion-panel-header>
                        <v-row no-gutters>
                        <v-col cols="10">
                            {{ station.title }}
                        </v-col>
                        <v-col
                            cols="2"
                            class="text--secondary"
                        >
                            <v-fade-transition leave-absolute>
                            <v-row
                                no-gutters
                                style="width: 100%"
                                justify="center"
                            >
                                <v-col cols="12">
                                Show Details
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
                        <v-col cols="12" md="8">
                            <v-icon
                                right
                                dark
                                class="mb-1"
                            >
                                mdi-map-marker
                            </v-icon>
                            {{ station.address || 'Not set' }}
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-icon
                                right
                                dark
                                class="mb-1"
                            >
                                mdi-calendar-clock
                            </v-icon>
                            {{ station.access || 'Not set' }}
                        </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row
                        justify="center"
                        no-gutters
                        class="pt-3"
                        >
                        <v-col cols="12">
                            <v-icon
                                right
                                dark
                                class="mb-1"
                            >
                                mdi-information
                            </v-icon>
                            {{ station.comments || 'Not set' }}
                        </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
        <v-row
            justify="center"
            class="mt-2"
        >
            <v-col cols="12" md="7">
                <v-btn
                    depressed
                    color="green"
                    @click="validateStations"
                >
                    Validate your stations
                </v-btn>
            </v-col>
            <v-col cols="12" md="5">
                <v-btn
                    depressed
                    color="red"
                    @click="cancel"
                >
                    Cancel
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
    name: "StationsPicker",
    data: function () {
        return {
            stations: this.$store.state.trajects.trajects,
    }},
    computed: mapGetters(['getStations','getTrajectInModification','getUserId','getToken']),
    methods: {
        ...mapActions(['addStationsToTraject','fetchTrajects']),
        ...mapMutations(['setPickStationToFalse','trajectUpdated']),
        async validateStations(){
            await this.addStationsToTraject({stations: this.getStations, token: this.getToken});
            return this.fetchTrajects(this.getToken);
        },
        cancel(){
            this.trajectUpdated();
        }
    }
    
}
</script>