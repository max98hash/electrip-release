<template>
    <!-- <v-card
        elevation="12"
        width="256"
    >
        <v-navigation-drawer
            permanent
        >
            <v-list
            dense
            rounded
            >
            <v-list-item
                v-for="item in items"
                :key="item.title"
                :to="item.path"
                link
            >
                <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="!getLogged" v-on:click="setLogin" link>
                <v-list-item-content>
                    <v-list-item-title>Login</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="getLogged" v-on:click="setLogout" link>
                <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-else v-on:click="invertOverlayLogin" link>
                <v-list-item-content>
                    <v-list-item-title>Register</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card> -->
    <v-card class="rounded-xl">
        <v-container>
            <v-row justify="center" align="center" class="mb-2">
                <v-img class="mr-3"
                    src="../../public/toppng.com-lightning-labs-blog-lightning-labs-logo-154x302.png"
                    max-height="130"
                    max-width="50"
                ></v-img>
                <h1>Electrip</h1>
            </v-row>
            <v-row justify="center">
                <v-col cols="3" lg="12" v-if="!getLogged">
                    <v-btn
                        depressed
                        color="#e33707"
                        @click="setLogin"
                        rounded
                    >
                        Login
                    </v-btn>
                </v-col>
                <v-col cols="3" lg="12" v-if="!getLogged">
                    <v-btn
                        depressed
                        color="primary"
                        @click="setLogin"
                        rounded
                        class="mb-2"
                    >
                        Register
                    </v-btn>
                </v-col>
                <v-col v-else>
                    <v-btn
                        depressed
                        color="grey"
                        @click="setLogout"
                        class="mb-2"
                        rounded
                    >
                        Logout
                    </v-btn>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row justify="center" class="mt-2">
                <p class="font-weight-thin">
                Powered by
                </p>
            </v-row>
            <v-row justify="center" align="center" max-width="200">
                <v-col cols="3" class="d-flex justify-center">
                    <v-img
                    src="../../public/1184px-Vue.js_Logo_2.svg.png"
                    max-height="40"
                    max-width="40"
                ></v-img>
                </v-col>
                <v-col cols="3" class="d-flex justify-center">
                    <v-img
                    src="../../public/vuetify-logo-3BCF73C928-seeklogo.com.png"
                    max-height="50"
                    max-width="40"
                ></v-img>
                </v-col>
                <v-col cols="3" class="d-flex justify-center">
                    <v-img
                    src="../../public/nodejs.png"
                    max-height="40"
                    max-width="80"
                ></v-img>
                </v-col >
                <v-col cols="3" class="d-flex justify-center">
                    <v-img
                    src="../../public/mongodb-logo.png"
                    max-height="40"
                    max-width="40"
                ></v-img>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
    
</template> 

<script>
import { mapGetters, mapMutations } from 'vuex';
import { busMap } from '../main';

export default {
    data: () => ({
        overlay: false,
        items: [
          { title: 'Home', icon: 'mdi-home', path: '/' },
        ],
    }),
    computed: mapGetters(['getLogged','getDisplayCharging']),
    methods: {
        ...mapMutations(['invertOverlayLogin','logout','invertLoginOrRegister','setDisplayChargingTrue','setDisplayChargingFalse']),
        setLogin(){
            this.invertOverlayLogin();
            this.invertLoginOrRegister();
            
        },
        async setLogout(){
            this.$store.state.trajects.allTrajects=false;
            this.$store.state.trajects.trajectsButFiltered=false;
            this.$store.state.trajects.trajects=[];
            this.$store.state.trajects.trajectsSelected=[];
            this.$store.state.trajects.events=[];
            this.logout();
            busMap.$emit('hideAll');
        }
    },
    
  }
</script>