<template>
  <v-container>
    <v-row justify="end">
      <v-btn variant="outlined" color="secondary" class="mb-3" @click="dialog = true">
        Add Item
        <i class="fa-solid fa-plus ml-1" />
      </v-btn>
    </v-row>
    <v-row>
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="items"
        item-value="name"
        class="elevation-1"
        density="compact"
      />  
    </v-row>
  </v-container>
  <AddItemDialog :dialog="dialog" @submit="addItem($event)" @close="dialog = false" />
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import AddItemDialog from '@/dialogs/AddItemDialog.vue'

export default {
  name: 'Charts',
  components: { VDataTable, AddItemDialog },
  data() {
    return {
      dialog: false,
      itemsPerPage: 5,
      headers: [
        {
          title: 'Category',
          key: 'category',
          align: 'start'
        },
        {
          title: 'Value',
          key: 'value',
          align: 'start'
        }
      ],
      items: []
    }
  },
  methods: {
    addItem(item) {
      console.log('item = ', item)
      this.items.push({
        category: item.category,
        value: item.value
      })
    }
  }
}
</script>

<style>
  .align-middle {
  vertical-align: middle;
  }
</style>