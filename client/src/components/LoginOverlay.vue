<template>
    <v-overlay
        :value="getOverlayLogin"
    >
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
        <v-container>
            <v-row>
                <v-text-field
                label="Email"
                placeholder="example@gmail.com"
                v-model="email"
                :rules="[rules.required,rules.email]"
                required
                outlined
                clearable
                ></v-text-field>
            </v-row>
            <v-row>
                <v-text-field
                label="Password"
                placeholder="********"
                v-model="password"
                type="password"
                :rules="[rules.required]"
                required
                outlined
                clearable
                ></v-text-field>
            </v-row>
            <v-row>
            <v-btn
                elevation="2"
                rounded
                @click="setLogin"
            >
                Back
            </v-btn>

            <v-btn
                elevation="2"
                rounded
                :disabled="!valid"
                @click="submit"
            >
                Login
            </v-btn>
            </v-row>
        </v-container>
        </v-form>
    </v-overlay>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'LoginOverlay',
  data: () => ({
    valid: true,
    email: "",
    password: "",
    rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
    }
  }),
  computed: mapGetters(['getOverlayLogin','getLoginOrRegister','getUserId','getToken']),
  methods: {
    ...mapActions(['login','register','fetchCars','fetchTrajects','filterSelectedTrajects']),
    ...mapMutations(['invertOverlayLogin','invertLoginOrRegister','setDisplayChargingFalse']),
    async submit(){
        if(this.$refs.form.validate()){
            if(this.getLoginOrRegister){
                await this.login({email: this.email,password: this.password}); 
                this.invertLoginOrRegister();
                this.setDisplayChargingFalse()
                await this.fetchCars(this.getToken);
                await this.fetchTrajects(this.getToken);
                this.filterSelectedTrajects();
            }else{
                console.log("register");
                this.register({email: this.email,password: this.password})
                this.email="";
                this.password="";
            }
            this.invertOverlayLogin();
            this.email="";
            this.password="";
      }
    },
    setLogin(){
        this.invertOverlayLogin();
        this.invertLoginOrRegister();
    }
  },
}
</script>