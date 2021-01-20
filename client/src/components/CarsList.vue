<template >
  <div v-if="getCreateCar">
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
              <td ><v-btn
                        depressed
                        color="red"
                        :id="car._id"
                        @click="remove($event)"
                    >
                    <v-icon
                        right
                        dark
                        class="pr-2"
                    >
                        mdi-delete
                    </v-icon>
                        Delete
                    </v-btn>
                </td>
            </tr>
          </tbody>
      </v-simple-table>
      <v-divider></v-divider>
      <v-btn
          depressed
          color="primary"
          @click="setCreateCar"
          class="mt-2 mb-2"
      >
      <v-icon
          right
          dark
          class="pr-6"
      >
          mdi-plus-circle
      </v-icon>
        Add Car
      </v-btn>
  </div>
  <div v-else>
    <v-spacer></v-spacer>
    <CarsForm/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import CarsForm from '../components/forms/CarsForm';

export default {
    name: 'CarsList',
    components: {
        CarsForm,
    },
    computed: mapGetters(['getCreateCar','getCars','getUserId','getToken']),
    methods: {
      ...mapMutations(['setCreateCar']),
      ...mapActions(['fetchCars','fetchTrajects','deleteCar','filterSelectedTrajects']),
      async remove(event){
        let carId = event.currentTarget.id;
        await this.deleteCar({carId, token: this.getToken});
        await this.fetchTrajects(this.getToken)
        this.filterSelectedTrajects();
      },
    },
    mounted(){
      this.fetchCars(this.getToken);
    },
}
</script>
