<template>
  <v-app>
    <v-container class="mb-5">
      <v-row>
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
      </v-row>
    </v-container>
    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list>
        <v-list-item to="/" prepend-icon="fa-solid fa-house" title="Home" @click="drawer = false" />
        <v-list-item to="/pets" prepend-icon="fa-solid fa-cat" title="Pets" @click="drawer = false" />
        <v-list-item to="/todo" prepend-icon="fa-solid fa-list-check" title="ToDo" @click="drawer = false" />
        <v-list-item to="/questions" prepend-icon="fa-solid fa-question" title="Questions" @click="drawer = false" />
        <v-list-item to="/charts" prepend-icon="fa-solid fa-chart-line" title="Charts" @click="drawer = false" />
      </v-list>
    </v-navigation-drawer>
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
      toggleTheme: () => {
        theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
        localStorage.setItem('theme', theme.global.name.value);
      }
    }
    },
    data: () => ({
      drawer: false,
    }),
    mounted() {
      this.theme.global.name.value = localStorage.getItem('theme') || 'dark';
    },
    methods: {
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
