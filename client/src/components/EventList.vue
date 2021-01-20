<template>
    <v-container>
        <v-row>
            <v-expansion-panels>
                <v-expansion-panel v-for="event in getEvents" v-bind:key="event.name">
                    <v-expansion-panel-header>
                        <v-row no-gutters>
                        <v-col cols="4">
                            {{ event.name }}
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
                                <v-col cols="4">
                                    {{ event.category || 'Not set' }}
                                </v-col>
                                <v-col cols="8">
                                <div v-if="event.end">
                                    <v-icon
                                    left
                                    dark
                                    >
                                        mdi-calendar
                                    </v-icon>
                                    {{ event.start+" -> "+event.end}}
                                </div>
                                <div v-else>
                                    <v-icon
                                        left
                                        dark
                                    >
                                        mdi-calendar
                                    </v-icon>
                                    {{ event.start }}
                                </div>
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
                            {{ event.description || 'No description' }}
                        </v-col>
                        </v-row>
                        
                        <v-divider></v-divider>
                        <v-row justify="center">
                            <v-col cols="12" md="2">
                                <v-btn
                                    depressed
                                    color="red"
                                    :id="event._id"
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
        <v-row v-if="!getAllEvents"
            justify="center"
            class="mt-2"
        >
            <v-btn
                depressed
                color="primary"
                @click="addEvent"
                class="mr-5"
            >
            <v-icon
                right
                dark
                class="pr-6"
            >
                mdi-plus-circle
            </v-icon>
                Add Event
            </v-btn>
            <v-btn
                depressed
                color="green"
                @click="addEvent"
            >
            <v-icon
                right
                dark
                class="pr-6"
            >
                mdi-eye
            </v-icon>
                Show All Events
            </v-btn>
        </v-row>
        <v-row v-else
            justify="center"
            class="mt-2"
        >
            <v-btn
                depressed
                color="primary"
                @click="addEvent"
            >
            <v-icon
                right
                dark
                class="pr-6"
            >
                mdi-plus-circle
            </v-icon>
                Add Event
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
//import { busMap } from '../main';

export default {
    data: function () {
        return {
      date: null,
      trajects: this.$store.state.trajects.trajects,
    }},
    computed: mapGetters(['getEvents','getAllEvents','getToken']),
    methods: {
        ...mapMutations(['setCarName','setAllTrajectsToTrue','setViewTrajectToFalse','setDisplayChargingFalse','invertEventPicker']),
        ...mapActions(['fetchEvents','addtraject','filterSelectedTrajects','deleteEvent']),
        async remove(event){
            let eventId = event.currentTarget.id;
            await this.deleteEvent({eventId, token: this.getToken});
            this.filterSelectedTrajects();
        },
        async showAllTrajects(){
            this.setAllEventsToTrue();
            await this.fetchEvents(this.getToken);
            this.filterSelectedTrajects();
        },
        addEvent(){
            this.invertEventPicker()
        }
    },
}
</script>