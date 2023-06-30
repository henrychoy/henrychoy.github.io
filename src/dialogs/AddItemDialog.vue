<template>
  <div class="text-center">
    <v-dialog
      v-model="showDialog"
      max-width="90%"
    >
      <v-card>
        <v-toolbar
          color="primary"
          title="Add Item"
          density="compact"
        />
        <v-card-text>
          <v-form @submit.prevent>
            <v-text-field
              v-model="category"
              :rules="rules"
              label="Category"
            />
            <v-text-field
              v-model="value"
              :rules="rulesNumerical"
              label="Value"
            />
            <v-btn type="submit" block class="mt-2" @click="showDialog=false; $emit('submit', { category, value });">Submit</v-btn>
          </v-form>
        </v-card-text>
        <!-- <v-card-actions class="justify-end">
          <v-btn color="secondary" block @click="showDialog=false">Submit</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'AddItemDialog',
    props: {
      dialog: Boolean
    },
    emits: ['submit'],
    data() {
      return {
        category: '',
        value: '',
        rules: [
          value => {
            if (value) return true
            return 'Required Field'
          },
        ],
        rulesNumerical: [
          value => {
            if (!isNaN(parseFloat(value))) return true
            return 'Value must be a numerical value'
          },
        ],
      }
    },
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
