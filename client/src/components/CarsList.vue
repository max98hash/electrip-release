<template >
  <v-simple-table v-if="getCreateCar">
    <template v-slot:default>
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
        </tr>
        <v-btn block v-on:click="setCreateCar">
            +
        </v-btn>
      </tbody>
    </template>
  </v-simple-table>
  <CarsForm v-else/>
</template>

<script>
import { mapGetters, mapMutations} from 'vuex';
import CarsForm from '../components/forms/CarsForm';

export default {
    name: 'CarsList',
    components: {
        CarsForm,
    },
    computed: mapGetters(['getCreateCar','getCars']),
    methods: mapMutations(['setCreateCar']),
}
</script>
