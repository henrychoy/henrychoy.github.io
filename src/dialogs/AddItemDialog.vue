<template>
  <div class="text-center">
    <v-dialog
      v-model="showDialog"
      max-width="90%"
      @click:outside="$emit('close', true);"
      @keydown.escape="$emit('close', true);"
    >
      <v-card>
        <v-toolbar
          color="primary"
          :title="Object.keys(edit).length === 0 ? 'Add Item' : 'Edit Item'"
          density="compact"
        />
        <v-card-text>
          <v-form ref="form" @submit.prevent>
            <!-- <v-text-field
              v-model="category"
              :rules="rules"
              label="Category"
            /> -->
            <v-select
              v-model="category"
              :items="categories"
              :rules="rules"
              label="Category"
            />
            <v-text-field
              v-model="value"
              :rules="rulesNumerical"
              label="Value"
            />
            <v-btn type="submit" block class="mt-2" @click="submitForm(category, value, index)">Submit</v-btn>
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
      dialog: Boolean,
      edit: {
        type: Object,
        default: () => {}
      }
    },
    emits: ['submit', 'close', 'editItem'],
    data() {
      return {
        category: '',
        categories: ['Housing', 'Transportation', 'Food', 'Insurance', 'Healthcare', 'Utilities', 'Entertainment', 'Other'],
        value: 0,
        rules: [
          value => {
            if (value) return true
            return 'Required Field'
          },
        ],
        rulesNumerical: [
          value => {
            if (!isNaN(value)) return true
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
          this.$emit('close', true)
        }
      },
      index() {
        return Object.keys(this.edit).length === 0 ? null : this.edit.index
      }
    },
    updated() {
      this.category = Object.keys(this.edit).length > 0 ? this.edit.columns.category : ''
      this.value = Object.keys(this.edit).length > 0 ? this.edit.columns.value : ''
    },
    methods: {
      async submitForm(category, value, index) {
        const { valid } = await this.$refs.form.validate()
        if (valid) {
          if(Object.keys(this.edit).length === 0) {
            this.$emit('submit', { category, value });
          } else {
            this.$emit('editItem', { category, value, index });
          }
          this.$refs.form.reset()
          this.$emit('close', true);
        }
      },
    }
  }
</script>
