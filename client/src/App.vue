<template>
  <div id="app">
    
    <router-view/>
    <LoginOverlay/>
    <CalendarOverlay/>
  </div>
</template>

<script>
import LoginOverlay from "./components/LoginOverlay"
import CalendarOverlay from './components/TrajectOverlay'

export default {
  name: 'App',
  components: {
    LoginOverlay,
    CalendarOverlay,
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
