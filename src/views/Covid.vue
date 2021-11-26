<template>
    
    <div>
        <h1>Covid Tracker</h1>

        <div class="gridContainer">
            <covidGrid class="gridContainer" v-bind:usa="usa" v-bind:global="global"></covidGrid>
        
        
        <br><br>
        
        <!-- <CovidChart title="USA Covid Data by State" v-bind:list="states" item="State"></CovidChart> <br><br>
        <CovidChart title="World Covid Data by Country" v-bind:list="countries" item="Country"></CovidChart> -->

        <BarChart v-if="loaded" :chartdata="cases" :options="options"></BarChart>  <br><br>
        <BarChart v-if="loaded" :chartdata="deaths" :options="options"></BarChart>

        <br><br>

        <CovidTable title="USA Covid Data by State" v-bind:list="states" item="State"></CovidTable> <br><br>
        <CovidTable title="World Covid Data by Country" v-bind:list="countries" item="Country"></CovidTable>
        </div>
    </div>

</template>

<script>
import CovidTable from '../components/CovidTable.vue'
import CovidGrid from '../components/CovidGrid.vue'
import BarChart from '../components/BarChart.vue'
import { Bar } from 'vue-chartjs'


export default {
    extends: Bar,
    components: {
        CovidTable,
        CovidGrid,
        BarChart,
    },
    data() {
        return {
            states: [],
            countries: [],
            global: {},
            usa: {},

            cases: {},
            deaths: {},
            loaded: false,
            options: {
                // title: {
                //     display: true,
                //     text: 'Covid Cases'
                //     },
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            maxTicksLimit: 20
                        }
                    }],
                }     
            }
        }
    },
    async mounted () {
        this.loaded = false

        // states
        fetch('https://disease.sh/v3/covid-19/states?yesterday=true')
            .then(res => res.json())
            .then(data => {
                for(let i = data.length - 1; i > 0; i--){
                    if(data[i].state == 'Northern Mariana Islands' || 
                       data[i].state == 'American Samoa' ||
                       data[i].state == 'Grand Princess Ship' ||
                       data[i].state == 'Wuhan Repatriated' ||
                       data[i].state == 'Diamond Princess Ship' ||
                       data[i].state == 'Federal Prisons' ||
                       data[i].state == 'United States Virgin Islands' ||
                       data[i].state == 'Navajo Nation' ||
                       data[i].state == 'District Of Columbia' ||
                       data[i].state == 'Puerto Rico' ||
                       data[i].state == 'Guam' ||
                       data[i].state == 'US Military' ||
                       data[i].state == 'Veteran Affairs'){
                    data.splice(i,1)
                    }
                }
                console.log(data)
                this.states = data
            })

        // countries
        fetch('https://disease.sh/v3/covid-19/countries?yesterday=true&sort=cases')
            .then(res => res.json())
            .then(data => {
                
                this.countries = data
                this.usa = data[0]
                // this.usa.cases = this.usa.cases
                // this.usa.todayCases = this.usa.todayCases
                // this.usa.deaths = this.usa.deaths
                // this.usa.todayDeaths = this.usa.todayDeaths
                // this.usa.recovered = this.usa.recovered
                // this.usa.todayRecovered = this.usa.todayRecovered

                this.usa.casesGrid = this.usa.cases.toLocaleString()
                this.usa.todayCasesGrid = this.usa.todayCases.toLocaleString()
                this.usa.deathsGrid = this.usa.deaths.toLocaleString()
                this.usa.todayDeathsGrid = this.usa.todayDeaths.toLocaleString()
                this.usa.recoveredGrid = this.usa.recovered.toLocaleString()
                this.usa.todayRecoveredGrid = this.usa.todayRecovered.toLocaleString()

                for(let i = 0; i < this.countries.length; i++){
                    this.countries[i].state = this.countries[i].country
                }
                console.log(this.usa)
            })
            

        // global
        fetch('https://disease.sh/v3/covid-19/all')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.global = data
                this.global.cases = this.global.cases.toLocaleString()
                this.global.todayCases = this.global.todayCases.toLocaleString()
                this.global.deaths = this.global.deaths.toLocaleString()
                this.global.todayDeaths = this.global.todayDeaths.toLocaleString()
                this.global.recovered = this.global.recovered.toLocaleString()
                this.global.todayRecovered = this.global.todayRecovered.toLocaleString()
            })
        
        // graph
        // https://henry-cors-server.herokuapp.com/https://covidtracking.com/api/us/daily
        fetch('https://disease.sh/v3/covid-19/nyt/usa')
            .then(res => res.json())
            .then(data => {
                // cases, minus total from the day before
                for(let i = data.length - 1; i > 1; i--){
                    if(data[i].cases > data[i - 1].cases) {
                        data[i].cases = data[i].cases - data[i - 1].cases
                    }
                    else{
                        data[i].cases = 0
                    }
                }

                // deaths, minus total from the day before
                for(let i = data.length - 1; i > 1; i--){
                    if(data[i].deaths > data[i - 1].deaths) {
                        data[i].deaths = data[i].deaths - data[i - 1].deaths
                    }
                    else{
                        data[i].deaths = 0
                    }
                } 

                this.loaded = true
                this.chartData = data
                console.log('this.chartData = ', this.chartData)

            const dates = data.map(d => d.date)
            const cases = data.map(d => d.cases)
            const deaths = data.map(d => d.deaths)

            this.cases = {
            labels: dates,
            datasets: [{
                label: '# of daily USA Cases',
                data: cases,
                backgroundColor: 'blue',
                }]
            }

            this.deaths = {
            labels: dates,
            datasets: [{
                label: '# of daily USA Deaths',
                data: deaths,
                backgroundColor: 'red',
                }]
            }
        })


    }

}
</script>

<style>


</style>