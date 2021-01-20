<template>
    <v-simple-table class="mb-12">
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
                :id="car._id+','+car.brand+','+car.model"
                @click="getCarSelected($event)"
                >
                    Select
                </v-btn>
            </td>
            </tr>
        </tbody>
    </v-simple-table>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'CarPicker',
  data: () => ({
    
  }),
  computed: mapGetters(['getCarOverlay','getCars','getCarName','getToken']),
  methods: {
    ...mapActions(['addtraject','fetchCars']),
    ...mapMutations(['invertCarOverlay','setCar','setCarName','plusPickerStep']),
    getCarSelected(event){
        let carParams = event.currentTarget.id;
        carParams = carParams.split(',');
        let carId = carParams[0];
        this.setCar(carId);
        this.setCarName(carParams[1]+" "+carParams[2]);
        this.plusPickerStep();
    }
  },
  mounted(){
      this.fetchCars(this.getToken)
  }
}
</script>