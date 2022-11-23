<template>
  <v-app>
    <v-app-bar
      color="primary"
      density="compact"
    >
      <template #prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </template>

      <v-app-bar-title>{{ $route.name }}</v-app-bar-title>

      <template #append>
        <v-switch 
          :label="`${theme.global.name.value[0].toUpperCase() + theme.global.name.value.substring(1)} Mode`"
          class="mt-5" @click="toggleTheme" 
        />
      </template>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list>
        <v-list-item to="/" prepend-icon="fa-solid fa-house" title="Home" />
        <v-list-item to="/cat" prepend-icon="fa-solid fa-cat" title="Cats" />
        <v-list-item to="/todo" prepend-icon="fa-solid fa-list-check" title="ToDo" />
      </v-list>
    </v-navigation-drawer>
    <br><br><br>
    <router-view />
  </v-app>
</template>

<script>
  import { useTheme } from 'vuetify'

  export default {
    setup() {
      const theme = useTheme()

    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
    },
    data: () => ({
      drawer: false,
    }),
    methods: {
      print() {
        console.log(this.$vuetify.theme.defaultTheme)
      },
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
