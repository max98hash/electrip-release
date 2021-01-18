<template>
    <v-card
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
            <v-list-item v-if="this.$store.state.map.displayCharging" v-on:click="setDisplayChargingFalse" link>
                <v-list-item-content>
                    <v-list-item-title>Hide charging</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="!this.$store.state.map.displayCharging" v-on:click="setDisplayChargingTrue" link>
                <v-list-item-content>
                    <v-list-item-title>Show Charging</v-list-item-title>
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
    </v-card>
    
</template> 

<script>
import { mapGetters, mapMutations } from 'vuex';

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
            this.logout();
        }
    },
    
  }
</script>