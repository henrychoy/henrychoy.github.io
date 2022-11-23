<template>
  <div class="text-center">
    <v-dialog
      v-model="showDialog"
      max-width="80%"
    >
      <v-card>
        <v-toolbar
          color="primary"
          title="Picture Generator Settings"
        />
        <v-card-text>
          <div>Hello world!</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" block @click="showDialog=false">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'PicsDialog',
    props: {
      dialog: Boolean
    },
    emits: ['submit'],
    computed: {
      showDialog: {
        get () {
          return this.dialog
        },
        set (dialog) {
          console.log(dialog)
          this.$emit('submit', dialog)
        }
      }
    }
  }
</script>
