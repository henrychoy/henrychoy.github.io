<template>
  <div>
    <h1>CLICK IMAGE TO LOAD RANDOM CAT</h1>
    <v-progress-circular
      v-if="loading"
      color="secondary"
      indeterminate
      :size="80"
      :width="12"
      class="mt-15 mb-3"
    />
    <p v-if="loading">Generating cat, please stand by...</p>
    <img v-show="!loading" :src="image" alt="" style="object-fit: contain; max-width: 100vw;" @click="getCat(); getFact()" @load="loading=false">
    <p v-show="!loading" class="mt-1 px-3"> Cat Fact: {{ fact }} </p>
  </div>
</template>

<script>

export default {
  name: 'Cat',
  data: () => ({
    image: null,
    loading: true,
    fact: ''
  }),
  mounted() {
    this.getCat()
    this.getFact()
  },
  methods: {
    getCat() {
      this.image = null
      this.loading = true
      fetch('https://cataas.com/cat')
      .then(res => {
          this.image = res.url
      })
      .catch(err => {
          console.warn(err)
      })
    },
    getFact() {
      fetch('https://meowfacts.herokuapp.com/')
      .then(res => res.json())
      .then(data => {
        this.fact = data.data[0]
      })
      .catch(err => {
          console.warn(err)
      })
    }
  }
}
</script>
