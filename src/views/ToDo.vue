<template>
  <v-form class="px-5">
    <v-row>
      <v-text-field v-model="task" label="Task" density="compact" @keydown.enter="submit" />
      <v-btn :disabled="task.trim().length === 0" @click="submit">Add Task</v-btn>
    </v-row>
    <v-list>
      <v-list-item
        v-for="(item, index) in items" :key="item.title"
        border
      >
        <div 
          :style="[item.done ? {'text-decoration': 'line-through'} : {}]"
          class="d-flex justify-start"
        >
          {{ item.title }}
        </div>
        <template #append="{ }">
          <v-checkbox-btn v-model="item.done" />
          <v-icon @click="deleteTask(index)">fa-solid fa-trash-can</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-form>
  <v-list-item>
    <p class="d-flex justify-end">{{ done }} / {{ items.length }}</p>
    <v-progress-linear color="secondary" :model-value="calcProgress()" :height="12" />
  </v-list-item>
</template>

<script>
  var STORAGE_KEY = 'todo-storage';
  export default {
    data: () => ({
      task: '',
      items: [],
    }),
    computed: {
      done() {
        return this.items.filter(item => item.done).length
      }
    },
    watch: {
      items: {
        handler(newVal) {
          console.log('saving to local ', newVal)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
        },
        deep: true
      }
    },
    mounted() {
      this.items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      console.log('localstorage = ', localStorage)
    },
    methods: {
      submit(event) {
        if (this.task.trim().length === 0) {
          event.preventDefault()
          return
        }
        event.preventDefault()
        this.items.push({title: this.task, done: false})
        this.task = ''
      },
      deleteTask(index){
        this.items.splice(index, 1)
      },
      calcProgress() {
        if (this.items.length === 0) return 0
        return (this.done / this.items.length) * 100
      }
    }
  }
</script>
