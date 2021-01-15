<template>
    <v-overlay
        :value="getCarOverlay"
    >
    <v-simple-table>
        <thead>
            <tr>
            <th class="text-left">
                Brand
            </th>
            <th class="text-left">
                Model
            </th>
            <th class="text-left">
                Years
            </th>
            <th class="text-left">
                Matriculation
            </th>
            <th class="text-left">
                Autonomy
            </th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="car in getCars"
            :key="car.index"
            >
            <td class="text-left">{{ car.brand }}</td>
            <td class="text-left">{{ car.model }}</td>
            <td class="text-left">{{ car.years }}</td>
            <td class="text-left">{{ car.matriculationNbr }}</td>
            <td class="text-left">{{ car.autonomy }}</td>
            <td >
                <v-btn
                depressed
                color="primary"
                :id="car._id"
                @click="getCarSelected($event)"
                >
                    Select
                </v-btn>
            </td>
            </tr>
        </tbody>
        </v-simple-table>
    </v-overlay>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'LoginOverlay',
  data: () => ({
    
  }),
  computed: mapGetters(['getCarOverlay','getUserId','getCars']),
  methods: {
    ...mapActions(['addtraject']),
    ...mapMutations(['invertCarOverlay','setCar']),
    getDate(){
        this.setDate(this.date);
        console.log(this.date)
        this.addtraject(this.getUserId);
    },
    getCarSelected(event){
        let carId = event.currentTarget.id;
        this.setCar(carId);
        this.addtraject(this.getUserId);
        this.invertCarOverlay();
    }
  },
}
</script>