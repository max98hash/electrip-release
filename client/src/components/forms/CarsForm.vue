<template>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field
            label="Marque"
            placeholder="Renault"
            v-model="brand"
            :rules="[v => !!v || 'Name is required']"
            required
            outlined
            clearable
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field
            label="Modèle"
            placeholder="Zoé"
            v-model="model"
            :rules="[v => !!v || 'Model is required']"
            required
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field
            label="Année"
            placeholder="2019"
            v-model="years"
            :rules="[v => !!v || 'Years is required']"
            required
            outlined
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field
            label="Immatriculation"
            placeholder="XC-24D6-FD"
            v-model="matriculationNbr"
            :rules="[v => !!v || 'Matriculation is required']"
            required
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field
            label="Autonomie (en km)"
            placeholder="120"
            v-model="autonomy"
            :rules="[v => !!v || 'Autonomy is required']"
            required
            outlined
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn
            elevation="2"
            rounded
            @click="setCreateCar"
        >
            Back
        </v-btn>

        <v-btn
            elevation="2"
            rounded
            :disabled="!valid"
            @click="submit"
        >
            Create
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import {mapMutations, mapActions, mapGetters} from 'vuex';

export default {
  name: "CarsForm",
  computed: mapGetters(['getUserId','getToken']),
  data: () => ({ 
      brand: "",
      model: "",
      years: "",
      matriculationNbr: "",
      autonomy: "",
      valid: true,
  }),
  methods: {
    ...mapMutations(['setCreateCar']),
    ...mapActions(['addCar']),
    async submit(){
      if(this.$refs.form.validate()){
        console.log("userId : "+this.getUserId)
        this.addCar({
          car: {
            brand: this.brand,
            model: this.model,
            years: this.years,
            matriculationNbr: this.matriculationNbr,
            autonomy: this.autonomy,
          },
          token: this.getToken,
          });
        this.setCreateCar();
      }
    },
  },
}

</script>

<style scoped>

</style>