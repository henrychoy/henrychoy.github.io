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
        :prepend-inner-icon="icon"
      />
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
    <img v-show="!loading" :src="image" alt="" style="object-fit: contain; max-width: 100vw;" @click="clearQueryStrings(); getCat(); getFact()" @load="loading=false">
    <p v-show="!loading && selected !== 'Fox' && selected !== 'Bird' && !queryStringsProvided" class="mt-1 px-3"> {{ selected }} Fact: {{ fact }} </p>
  </div>
  <v-container class="mt-5">
    <v-text-field 
      v-model="shareURL"
      label="Send this URL to share this image"
      variant="outlined"
      :readonly="true"
      @focus="$event.target.select()"
    >
      <template #append-inner>
        <v-icon
          icon="fa-solid fa-copy"
          @click="copyURL"
        />
      </template>
    </v-text-field>
  </v-container>
  <v-snackbar v-model="copyToast" :timeout="1000" color="green">
    Copy Successful!
  </v-snackbar>
</template>

<script>

export default {
  name: 'Cat',
  data: () => ({
    image: null,
    loading: true,
    fact: '',
    animals: ['Cat', 'Dog', 'Fox', 'Bird'],
    selected: 'Cat',
    copyToast: false,
  }),
  computed: {
    endpoint() {
      if (this.selected === 'Cat') return 'https://api.thecatapi.com/v1/images/search'
      if (this.selected === 'Dog') return 'https://random.dog/woof.json'
      if (this.selected === 'Bird') return 'https://shibe.online/api/birds'
      return 'https://randomfox.ca/floof/'
    },
    factEndpoint() {
      if (this.selected === 'Cat') return 'https://meowfacts.herokuapp.com/'
      if (this.selected === 'Dog') return 'https://dogapi.dog/api/v2/facts'
      return ''
    },
    icon() {
      if (this.selected === 'Cat') return 'fa-solid fa-cat'
      if (this.selected === 'Dog') return 'fa-solid fa-dog'
      if (this.selected === 'Bird') return 'fa-solid fa-dove'
      return 'fa-brands fa-firefox-browser'
    },
    shareURL() {
      return `https://www.henrychoy.com/cat?animal=${this.selected}&img=${this.image}`
    },
    queryStringsProvided() {
      return (this.$route.query.animal !== undefined && this.$route.query.img !== undefined)
    }
  },
  watch: {
    selected() {
      this.getCat()
      if (!this.queryStringsProvided) {
        this.getFact()
      }
      localStorage.setItem('animal', JSON.stringify(this.selected))
    }
  },
  mounted() {
    if (this.queryStringsProvided) {
      console.log('this.$route.query.animal = ', this.$route.query.animal);
      console.log('this.$route.query.img = ', this.$route.query.img);
      // this.selected = this.$route.query.animal
      this.image = this.$route.query.img
    } else {
      this.selected = JSON.parse(localStorage.getItem('animal')) || 'Cat'
      this.getCat()
      this.getFact()
    }
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
        console.log('image = ', this.image)
      })
      .catch(err => {
          console.warn(err)
      })
    },
    getFact() {
      if (this.selected === 'Fox' || this.selected === 'Bird') return
      fetch(this.factEndpoint)
      .then(res => res.json())
      .then(data => {
        this.fact = this.selected === 'Cat' ? data.data[0] : data.data[0].attributes.body
      })
      .catch(err => {
          console.warn(err)
      })
    },
    getImgURL(data) {
      if (this.selected === 'Cat') return data[0].url
      if (this.selected === 'Dog') return data.url
      if (this.selected === 'Fox') return data.image
      if (this.selected === 'Bird') return data[0]
    },
    copyURL() {
      navigator.clipboard.writeText(this.shareURL);
      this.copyToast = true
    },
    clearQueryStrings() {
      if (this.queryStringsProvided) {
        window.location.href = window.location.href.split('?')[0]
        // this.$router.push('/cat')
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 150px;
}
</style>