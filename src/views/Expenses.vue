<template>
  <v-container style="max-width: 100%">
    <v-row justify="center" class="mb-3">
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
    <v-row v-resize="onResize">
      <v-col class="py-1" :cols="mobile ? 12 : 6">
        <v-window v-if="items.length > 0" v-model="tab">
          <v-window-item value="Donut" style="height:50vh">
            <Doughnut
              :data="chartData"
              :options="options"
            />
          </v-window-item>
          <v-window-item value="Pie" style="height:50vh">
            <Pie
              :data="chartData"
              :options="options"
            />
          </v-window-item>
          <v-window-item value="Bar" style="height:50vh">
            <Bar
              :data="barChartData"
              :options="options"
            />
          </v-window-item>
        </v-window>
      </v-col>
      <v-col v-if="!mobile" class="py-0" :cols="mobile ? 0 : 6">
        <v-data-table
          v-model:items-per-page="itemsPerPage"
          v-model:expanded="expanded"
          :headers="headers"
          :items="items"
          item-value="category"
          class="text-left"
          density="compact"
          show-expand
        >
          <template #[`item.percent`]="{ item }">
            <v-chip>{{ (item.columns.value/grandTotal * 100).toFixed(0) }}%</v-chip>
          </template>
          <template #[`item.actions`]="{ item }">
            <!-- <v-icon @click="edit=item; dialog=true">fa-regular fa-pen-to-square</v-icon> -->
            <v-icon class="ml-3" @click="deleteItem(item.index)">fa-regular fa-trash-can</v-icon>
          </template>
          <template #[`expanded-row`]="{ columns, item }">
            <tr v-for="(lineItem, lineItemIndex) in item.raw.lineItems" :key="lineItem" :colspan="columns.length">
              <td>
                <span>&bull;</span> {{ lineItem.description || `Expense #${lineItemIndex + 1}` }}
              </td>
              <td class="text-right">
                {{ lineItem.value }}
              </td>
              <td class="text-right">
                <v-chip>{{ (lineItem.value/grandTotal * 100).toFixed(0) }}%</v-chip>
              </td>
              <td>
                <v-icon class="ml-3" @click="deleteLineItem(item.index, lineItemIndex)">fa-regular fa-trash-can</v-icon>
              </td>
              <td class="text-center">
                <v-icon @click="edit={...item, lineItemIndex}; dialog=true">fa-regular fa-pen-to-square</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
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
    <v-row class="hidden-sm-and-up">
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        v-model:expanded="expanded"
        :headers="headers"
        :items="items"
        item-value="category"
        class="text-left"
        density="compact"
        show-expand
      >
        <template #[`item.percent`]="{ item }">
          <v-chip>{{ (item.columns.value/grandTotal * 100).toFixed(0) }}%</v-chip>
        </template>
        <template #[`item.actions`]="{ item }">
          <!-- <v-icon @click="edit=item; dialog=true">fa-regular fa-pen-to-square</v-icon> -->
          <v-icon class="ml-3" @click="deleteItem(item.index)">fa-regular fa-trash-can</v-icon>
        </template>
        <template #[`expanded-row`]="{ columns, item }">
          <tr v-for="(lineItem, lineItemIndex) in item.raw.lineItems" :key="lineItem" :colspan="columns.length">
            <td>
              <span>&bull;</span> {{ lineItem.description || `Expense #${lineItemIndex + 1}` }}
            </td>
            <td class="text-right">
              {{ lineItem.value }}
            </td>
            <td class="text-right">
              <v-chip>{{ (lineItem.value/grandTotal * 100).toFixed(0) }}%</v-chip>
            </td>
            <td>
              <v-icon class="ml-3" @click="deleteLineItem(item.index, lineItemIndex)">fa-regular fa-trash-can</v-icon>
            </td>
            <td class="text-center">
              <v-icon @click="edit={...item, lineItemIndex}; dialog=true">fa-regular fa-pen-to-square</v-icon>
            </td>
          </tr>
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

const STORAGE_KEY = 'chart-storage';

export default {
  name: 'Expenses',
  components: { VDataTable, AddItemDialog, Doughnut, Pie, Bar },
  data() {
    return {
      dialog: false,
      tab: null,
      edit: {},
      itemsPerPage: 10,
      expanded: [],
      headers: [
        {
          title: 'Category',
          key: 'category',
          align: 'start'
        },
        {
          title: 'Value',
          key: 'value',
          align: 'end'
        },
        {
          title: 'Percent',
          key: 'percent',
          align: 'end',
        },
        {
          title: '',
          key: 'actions',
          align: 'start',
          sortable: false,
        }
      ],
      items: [],
      colorPallete: [
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
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      windowSize: {
        x: 0,
        y: 0,
      },
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.items.map(item => item.category),
        datasets: [{
          label: 'My First Dataset',
          data: this.items.map(item => item.value),
          backgroundColor: this.colorPallete,
          hoverOffset: 4
        }]
      }
    },
    barChartData() {
      let transformedData = {
        labels: this.items.map(item => item.category),
        datasets: [],
      }
      this.items.forEach((item, index) => {
        transformedData.datasets.push({
          label: [item.category],
          data: Array.from({length: this.items.length}, (_, i) => (i === index ? item.value : null)),
          backgroundColor: this.colorPallete[index % this.colorPallete.length],
          hoverOffset: 4,
          skipNull: true,
        })
      })
      return transformedData
    },
    grandTotal() {
      let total = 0
      this.items.forEach((item) => {
        item.lineItems.forEach((lineItem) => {
          total = parseInt(total) + parseInt(lineItem.value)
        })
      })
      return total
    },
    mobile() {
      return this.windowSize.x < 600
    }
  },
  watch: {
    items: {
      handler(newVal) {
        this.items.forEach((item, index) => {
          if (item.lineItems.length === 0) {
            this.deleteItem(index)
          }
        })
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
      },
      deep: true
    }
  },
  mounted() {
    this.items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    this.onResize()
  },
  methods: {
    addItem(newExpense) {
      let match = false
      this.items.forEach((expense) =>{
        if (expense.category === newExpense.category) {
          expense.value = parseInt(expense.value) + parseInt(newExpense.value)
          expense.lineItems.push({description: newExpense.description, value: newExpense.value})
          match = true
        }
      })
      if (!match) {
        this.items.push({
          category: newExpense.category,
          value: newExpense.value,
          lineItems: [{description: newExpense.description, value: newExpense.value}]
        })
      }
    },
    editItem(item) {
      if (item.category !== this.items[item.index].category) {
        this.items[item.index].lineItems.splice(item.lineItemIndex, 1)
        this.addItem(item)
      } else {
        this.items[item.index].lineItems[item.lineItemIndex] = { category: item.category, value: item.value, description: item.description }
      }
      let categoryTotal = 0
      this.items[item.index].lineItems.forEach((lineItem) => {
        categoryTotal = parseInt(categoryTotal) + parseInt(lineItem.value)
      })
      this.items[item.index].value = categoryTotal
      this.edit = {}
    },
    deleteItem(index) {
      this.items.splice(index, 1)
    },
    deleteLineItem(index, lineItemIndex) {
      this.items[index].value -= this.items[index].lineItems[lineItemIndex].value
      this.items[index].lineItems.splice(lineItemIndex, 1)
    },
    loadExample() {
      // https://www.ramseysolutions.com/budgeting/american-average-monthly-expenses#:~:text=There%20are%20folks%20at%20the,income%20of%20%2478%2C743%20after%20taxes.
      this.items = this.items.concat([
        {category: 'Housing', value: 1885, lineItems: [{description: 'Rent', value: 1885}]},
        {category: 'Transportation', value: 913, lineItems: [{description: 'Car', value: 913}]},
        {category: 'Food', value: 691, lineItems: [{description: 'Groceries', value: 691}]},
        {category: 'Insurance', value: 656, lineItems: [{description: 'Monthly payment', value: 656}]},
        {category: 'Healthcare', value: 454, lineItems: [{description: 'Monthly payment', value: 454}]},
        {category: 'Entertainment', value: 297, lineItems: [{description: 'Vacation', value: 297}]},
        {category: 'Other', value: 234, lineItems: [{description: 'Toys', value: 234}]},
        {category: 'Charity', value: 201, lineItems: [{description: 'Donations', value: 201}]},
        {category: 'Clothes', value: 146, lineItems: [{description: 'Pants', value: 146}]},
        {category: 'Education', value: 102, lineItems: [{description: 'Online Class', value: 102}]},
      ])
      console.log('items = ', this.items);
    },
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
  }
}
</script>

<style>
 .v-table > .v-table__wrapper > table > tbody > tr > td, .v-table > .v-table__wrapper > table > tbody > tr > th, .v-table > .v-table__wrapper > table > thead > tr > td, .v-table > .v-table__wrapper > table > thead > tr > th, .v-table > .v-table__wrapper > table > tfoot > tr > td, .v-table > .v-table__wrapper > table > tfoot > tr > th {
    padding-left: 6px;
    padding-right: 0;
  }
</style>