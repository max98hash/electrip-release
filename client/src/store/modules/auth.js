const axios = require('axios');

const state = {
    logged: false,
    userId: null,
    token: null,
    overlayLogin: false,
    loginOrRegister: false,
};

const getters = {
    getLogged: state => state.logged,
    getUserId: state => state.userId,
    getToken: state => state.token,
    getOverlayLogin: state => state.overlayLogin,
    getLoginOrRegister: state => state.loginOrRegister,
};

const actions = {
    async login({commit},authCouple){
        const response = await axios.post(`http://localhost:4444/login`, {
            password: authCouple.password,
            email: authCouple.email,
        });
        console.log("idUser : "+response.data.userId);
        console.log("token : "+response.data.token);
        commit('setLogin',{
            id: response.data.userId,
            token: response.data.token,
        })
    },
    async register({commit},authCouple){
        const response = await axios.post(`http://localhost:4444/signup`, {
            password: authCouple.password,
            email: authCouple.email,
        });
        commit('setRegister',{response})
    },
};

const mutations = {
    invertOverlayLogin: state => state.overlayLogin=!state.overlayLogin,
    setLogin: (state, loginCouple) => {
        state.logged=true;
        state.token = loginCouple.token ;
        state.userId = loginCouple.id;
    },
    logout: state => {
        state.logged=false;
        state.userId=null;
        state.token=null;
    },
    invertLoginOrRegister: state => state.loginOrRegister=!state.loginOrRegister,
    setRegister: (state,response) => console.log(response),
};

export default {
    state,
    getters,
    actions,
    mutations,
}