<template>
    <v-container>
        <v-row>
            <v-expansion-panels>
                <v-expansion-panel v-for="traject in getTrajects" v-bind:key="traject.name">
                    <v-expansion-panel-header>
                        <v-row no-gutters>
                        <v-col cols="4">
                            {{ traject.name }}
                        </v-col>
                        <v-col
                            cols="8"
                            class="text--secondary"
                        >
                            <v-fade-transition leave-absolute>
                            <v-row
                                no-gutters
                                style="width: 100%"
                                justify="center"
                            >
                                <v-col cols="3">
                                {{ Math.round(traject.distance * 0.01) / 10 || 'Not set' }} km
                                </v-col>
                                <v-col cols="3">
                                Charges: {{ traject.stations || 'Not set' }}
                                </v-col>
                                
                                <v-col cols="4">
                                    <v-icon
                                    left
                                    dark
                                >
                                    mdi-calendar
                                </v-icon>
                                {{ traject.date || 'Not set' }}
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
                                class="mb-1"
                            >
                                mdi-home-map-marker
                            </v-icon>
                            {{ traject.startName || 'Not set' }}
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-icon
                                right
                                dark
                                class="mb-1"
                            >
                                mdi-flag-checkered
                            </v-icon>
                            {{ traject.endName || 'Not set' }}
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-icon
                                right
                                dark
                            >
                                mdi-car-electric
                            </v-icon>
                            {{ traject.carName || 'Not set' }}
                        </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row
                        justify="center"
                        no-gutters
                        class="pt-3"
                        >
                        <v-col cols="12" md="4" class="pb-2">
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

                        <v-col cols="12" md="4" class="pb-2">
                            <v-btn
                                depressed
                                color="indigo"
                                :id="traject._id"
                                @click="displayCharging($event)"
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
                        <v-col cols="3" md="3">
                            <v-btn
                                depressed
                                color="red"
                                :id="traject._id"
                                @click="remove($event)"
                            >
                            <v-icon
                                right
                                dark
                                class="pr-6"
                            >
                                mdi-delete
                            </v-icon>
                                Delete
                            </v-btn>
                        </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
        <v-row v-if="!getAllTrajects"
            justify="center"
            class="mt-2"
        >
            <v-btn
                depressed
                color="green"
                @click="showAllTrajects"
            >
                Show All Trajects
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { busMap } from '../main';

export default {
    data: function () {
        return {
      date: null,
      trajects: this.$store.state.trajects.trajects,
    }},
    computed: mapGetters(['getCarName','getTrajects','getUserId','getAllTrajects']),
    methods: {
        ...mapMutations(['setCarName','setAllTrajectsToTrue']),
        ...mapActions(['fetchTrajects','addtraject','filterSelectedTrajects','deleteTraject']),
        showButton(event){
            console.log(event.currentTarget.id)
        },
        async remove(event){
            let trajectId = event.currentTarget.id;
            await this.deleteTraject(trajectId);
            this.filterSelectedTrajects();
        },
        async showAllTrajects(){
            this.setAllTrajectsToTrue();
            await this.fetchTrajects(this.getUserId);
            this.filterSelectedTrajects();
        },
        displayCharging(event){
            busMap.$emit('displayCharging',event.currentTarget.id);
        }
    },
}
</script>