<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <v-tabs
        v-model="tab"
        bg-color="primary"
        align-tabs="center"
      >
        <v-tab value="Donut">Donut</v-tab>
        <v-tab value="Pie">Pie</v-tab>
        <v-tab value="Bar">Bar</v-tab>
      </v-tabs>
    </v-row>
    <v-window v-if="items.length > 0" v-model="tab">
      <v-window-item value="Donut">
        <Doughnut
          :data="chartData"
        />
      </v-window-item>
      <v-window-item value="Pie">
        <Pie
          :data="chartData"
        />
      </v-window-item>
      <v-window-item value="Bar">
        <Bar
          :data="chartData"
        />
      </v-window-item>
    </v-window>
    <v-row justify="space-around" class="mt-5">
      <v-btn variant="outlined" color="secondary" class="mb-3 ml-3" @click="loadExample()">
        Example
        <i class="fa-solid fa-plus ml-1" />
      </v-btn>
      <v-btn :disabled="items.length === 0" variant="outlined" color="secondary" class="mb-3 ml-3" @click="items = []">
        Clear
        <i class="fa-regular fa-trash-can" />
      </v-btn> 
      <v-btn variant="outlined" color="secondary" class="mb-3 ml-3" @click="dialog=true">
        Add
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
      >
        <template #[`item.actions`]="{ item }">
          <v-icon @click="edit=item; dialog=true">fa-regular fa-pen-to-square</v-icon>
          <v-icon @click="deleteItem(item.index)" class="ml-3">fa-regular fa-trash-can</v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
  <AddItemDialog :dialog="dialog" :edit="edit" @submit="addItem($event)" @edit-item="editItem($event)" @close="dialog = false; edit = {}" />
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import AddItemDialog from '@/dialogs/AddItemDialog.vue'
import { Doughnut, Pie, Bar } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale)

export default {
  name: 'Charts',
  components: { VDataTable, AddItemDialog, Doughnut, Pie, Bar },
  data() {
    return {
      dialog: false,
      tab: null,
      edit: {},
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
        },
        {
          title: '',
          key: 'actions',
          align: 'start',
          sortable: false,
        }
      ],
      items: []
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.items.map(item => item.category),
        datasets: [{
          label: 'My First Dataset',
          data: this.items.map(item => item.value),
          backgroundColor: [
            '#4285F4', // Blue
            '#DB4437', // Red
            '#F4B400', // Yellow
            '#0F9D58', // Green
            '#AB47BC', // Purple
            '#FF7043', // Orange
            '#9E9E9E', // Grey
            '#00ACC1', // Teal
            '#5C6BC0', // Indigo
            '#FF9800'  // Amber
          ],
          hoverOffset: 4
        }]
      }
    },
  },
  methods: {
    addItem(item) {
      this.items.push({
        category: item.category,
        value: item.value
      })
    },
    editItem(item) {
      this.items[item.index] = { category: item.category, value: item.value }
      this.edit = {}
    },
    deleteItem(index) {
      this.items.splice(index, 1)
    },
    loadExample() {
      this.items = this.items.concat([
        {category: 'Rent', value: 1000},
        {category: 'Food', value: 180},
        {category: 'Utilities', value: 80},
        {category: 'Internet', value: 100},
        {category: 'Car Gas', value: 160},
        {category: 'Misc', value: 60},
      ])
      console.log('items = ', this.items);
    }
  }
}
</script>

<style>
  .align-middle {
  vertical-align: middle;
  }
</style>