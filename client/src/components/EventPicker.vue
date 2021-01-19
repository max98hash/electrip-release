<template>
  <v-stepper v-model="getPickerEventStep">
    <v-stepper-header>
      <v-stepper-step
        :complete="getPickerEventStep > 1"
        step="1"
      >
        Informations
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="getPickerEventStep > 2"
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
          <v-container>
            <v-row>
                <v-col cols="4">
                    <v-text-field
                    label="Name"
                    :rules="rules"
                    hide-details="auto"
                    v-model="name"
                    solo
                    ></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-select
                        v-model="category"
                        :items="items"
                        label="Category"
                        solo
                    ></v-select>
                </v-col>
          </v-row>
          <v-row>
              <v-col cols="8">
                  <v-textarea
                    label="Description"
                    hide-details="auto"
                    v-model="description"
                    solo
                ></v-textarea>
              </v-col>
          </v-row>
          </v-container>

        <v-btn @click="invertEventPicker" class="mr-2">
          Cancel
        </v-btn>
        <v-btn v-if="name==null"
            text 
            @click="plusEventPickerStep"
            disabled
            >
          Next
        </v-btn>
        <v-btn v-else-if="category==null"
            text 
            @click="plusEventPickerStep"
            disabled
            >
          Next
        </v-btn>
        <v-btn v-else
            color="primary" 
            @click="plusEventPickerStep"
            >
          Next
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-container>
            <v-row justify="center" align="center">
                <v-col cols="12" xl="6">
                    <v-date-picker
                    v-model="start">
                    </v-date-picker>
                </v-col>
                <v-col cols="12" xl="6">
                    <v-date-picker
                    v-model="end">
                    </v-date-picker>
                </v-col>
                <!-- <v-col cols="12" xl="6">
                    <v-time-picker
                        format="24hr"
                        landscape
                        v-model="hour"
                    ></v-time-picker>
                </v-col> -->
            </v-row>
        </v-container>

        <v-btn @click="minusEventPickerStep" class="mr-2">
          Cancel
        </v-btn>
        <v-btn v-if="start==null"
            text 
            @click="plusEventPickerStep"
            disabled
            >
          Next
        </v-btn>
        <v-btn v-else
            color="primary" 
            @click="plusEventPickerStep"
            >
          Next
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-row
            justify="center"
            no-gutters
            class="pb-2"
            >
            <v-col cols="12" md="5">
                {{ name }}
            </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row justify="center" v-if="description">
                <v-col cols="12" md="10">
                    {{ description }}
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row justify="center" v-if="end">
                <v-col cols="12" md="5">
                    <v-icon
                        right
                        dark
                    >
                        mdi-calendar
                    </v-icon>
                    Start : {{ start }}
                </v-col>
                <v-col cols="12" md="5">
                    <v-icon
                        right
                        dark
                    >
                        mdi-calendar
                    </v-icon>
                    End : {{ end }}
                </v-col>
            </v-row>
            <v-row justify="center" v-else>
                <v-col cols="12" md="5">
                    <v-icon
                        right
                        dark
                    >
                        mdi-calendar
                    </v-icon>
                    Day : {{ start }}
                </v-col>
            </v-row>

        <v-btn text @click="minusEventPickerStep" class="mr-2">
          Cancel
          
        </v-btn>
        <v-btn
          color="primary"
          @click="submitEvent"
          class="mr-2"
        >
          Validate
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: "TrajectPicker",
    components: {
    },
    data:  function () {
        return {
            e1: 1,
            rules: [
                value => !!value || 'Required.',
            ],
            name: null,
            description: null,
            category: null,
            start: null,
            end: null,
            items: ['Family','Work','Sport','Holidays','Other']
        }
    },
    computed: mapGetters(['getPickerEventStep','getOriginName','getDestinationName','getCarName','getDate','getMap','getUserId','getEndDate','getStartDate','getToken']),
    methods: {
        ...mapActions(['addEvent','fetchCars','filterSelectedTrajects']),
        ...mapMutations(['minusEventPickerStep','plusEventPickerStep','invertEventPicker','initEventPickerStep']),
        async submitEvent(){
            /*const map = this.getMap;
            map.removeRoutes();*/
            this.invertEventPicker();
            this.initEventPickerStep();
            const event = {
                name: this.name,
                category: this.category,
                start: this.start,
            }
            if(this.description!=null){
                event['description']=this.description;
            }
            if(this.end!=null){
                event['end']=this.end;
            }
            await this.addEvent({token: this.getToken, event});
            this.name=null;
            this.description=null;
            this.category=null;
            this.start=null;
            this.end=null;
            this.filterSelectedTrajects();
        },
    }
}
</script>