<template>
  <div>
    <h1>
      CLICK IMAGE TO LOAD RANDOM
      <v-select
        v-model="selected"
        :items="animals"
        density="compact"
        variant="outlined"
        class="container d-inline-flex"
        prepend-inner-icon="fa-solid fa-cat"
      />
      <v-btn v-if="false" variant="outlined" color="secondary" class="mb-3" append-icon="fa-solid fa-gear" @click="dialog = true">Settings</v-btn>
    </h1>
    <v-progress-circular
      v-if="loading"
      color="secondary"
      indeterminate
      :size="80"
      :width="12"
      class="mt-15 mb-3"
    />
    <p v-if="loading">Generating {{ selected }}, please stand by...</p>
    <img v-show="!loading" :src="image" alt="" style="object-fit: contain; max-width: 100vw;" @click="getCat(); getFact()" @load="loading=false">
    <p v-show="!loading && selected !== 'Fox'" class="mt-1 px-3"> {{ selected }} Fact: {{ fact }} </p>
  </div>
  <PicsDialog :dialog="dialog" @submit="dialog=false" />
</template>

<script>
import PicsDialog from '@/dialogs/PicsDialog.vue'

export default {
  name: 'Cat',
  components: { PicsDialog },
  data: () => ({
    image: null,
    loading: true,
    fact: '',
    dialog: false,
    animals: ['Cat', 'Dog', 'Fox'],
    selected: 'Cat'
  }),
  computed: {
    endpoint() {
      if (this.selected === 'Cat') return 'https://cataas.com/cat?json=true'
      if (this.selected === 'Dog') return 'https://random.dog/woof.json'
      if (this.selected === 'Fox') return 'https://randomfox.ca/floof/'
      return 'https://cataas.com/cat?json=true'
    },
    factEndpoint() {
      if (this.selected === 'Cat') return 'https://meowfacts.herokuapp.com/'
      if (this.selected === 'Dog') return 'https://henry-cors-server.herokuapp.com/https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1'
      return 'https://meowfacts.herokuapp.com/'
    },
  },
  watch: {
    selected() {
      this.getCat()
      this.getFact()
    }
  },
  mounted() {
    this.getCat()
    this.getFact()
  },
  methods: {
    getCat() {
      this.image = null
      this.loading = true
      fetch(this.endpoint)
      .then(res => res.json())
      .then(data => {
        if ( this.selected === 'Dog' && data.url.includes( '.mp4' ) ) {
				  this.getCat();
			  }
        this.image = this.getImgURL(data)
      })
      .catch(err => {
          console.warn(err)
      })
    },
    getFact() {
      if (this.selected === 'Fox') return
      fetch(this.factEndpoint)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.fact = this.selected === 'Cat' ? data.data[0] : data[0].fact
      })
      .catch(err => {
          console.warn(err)
      })
    },
    getImgURL(data) {
      if (this.selected === 'Cat') return `https://cataas.com/${data.url}`
      if (this.selected === 'Dog') return data.url
      if (this.selected === 'Fox') return data.image
    },
  }
}
</script>

<style scoped>
.container {
  max-width: 150px;
}
</style>