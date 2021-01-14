import Vuex from 'vuex';
import Vue from 'vue';
import cars from './modules/cars';
import auth from './modules/auth';
import trajects from '../store/modules/trajects';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        cars,
        auth,
        trajects,
    }
})