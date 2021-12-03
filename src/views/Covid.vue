<template>
    
    <div>
        <h1>Covid Tracker</h1>

        <div class="gridContainer">
            <covidGrid class="gridContainer" :usa="usa" :global="global" :vaxData="vaxData" :key="vaxKey"></covidGrid>
        </div>

        <br>

        <div class="filters">
            <label for="selectCountry">Filter Country:  </label>
            <select name="selectCountry" id="selectCountry" v-model="selectedCountry">
                <option v-for="country in countryDropdown" :key=country>{{country}}</option>
            </select>
            
            <div :style="{opacity: this.selectedCountry == 'USA' ? '1' : '0'}">
                <label for="selectState">Filter State: </label>
                <select name="selectState" id="selectState" v-if="this.selectedCountry == 'USA'" v-model="selectedState">
                    <option v-for="state in stateDropdown" :key=state>{{state}}</option>
                </select>
            </div>

            <label for="selectTime">Filter Time: </label>
            <select name="selectTime" id="selectTime" v-model="selectedTime">
                <option v-for="time in timeDropdown" :key=time>{{time}}</option>
            </select>

            <div id="error" :style="{'opacity':error?1:0}">Country not found or doesn't have any historical data</div>

        </div>

        <BarChart v-if="loaded" :chartdata="cases" :options="options" :key="graphKey.cases"></BarChart>  <br><br>
        <BarChart v-if="loaded" :chartdata="deaths" :options="options" :key="graphKey.deaths"></BarChart>

        <br><br>

        <CovidTable title="USA Covid Data by State" v-bind:list="states" item="State"></CovidTable> <br><br>
        <CovidTable title="World Covid Data by Country" v-bind:list="countries" item="Country"></CovidTable>
        
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
    computed: {
        graphURL() {
            if(this.selectedCountry == "All Countries") return `https://disease.sh/v3/covid-19/historical/all?lastdays=all`
            else if(this.selectedCountry !== "USA") return `https://disease.sh/v3/covid-19/historical/${this.selectedCountry}?lastdays=all`
            else if(this.selectedState == "All States") return "https://disease.sh/v3/covid-19/nyt/usa"
            else return `https://disease.sh/v3/covid-19/nyt/states/${this.selectedState}?lastdays=all`
        }
    },
    watch: {
        selectedCountry() {
            this.getGraphs()
        },
        selectedState() {
            this.getGraphs()
        },
        selectedTime() {
            this.getGraphs()
        }
    },
    data() {
        return {
            // data for grid and table
            states: [],
            countries: [],
            global: {},
            usa: {},
            vaxData: {},
            vaxKey: 0,

            // data for graphs
            cases: {},
            deaths: {},
            loaded: false,
            options: {
                tooltips: {
                    mode: 'x-axis'
                },
                legend: {
                    labels: {
                        fontSize: 15
                    },
                    reverse: true
                },
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            

                        }
                    }],
                    xAxes: [{
                        ticks: {
                            maxTicksLimit: 20
                        }
                    }],
                }     
            },
            selectedCountry: "USA",
            selectedState: "All States",
            selectedTime: "All Time",
            countryDropdown: [],
            stateDropdown: [],
            timeDropdown: ['All Time', "One Week", "One Month", "Six Months", "One Year"],
            error: false,
            graphKey: {}
        }
    },
    async mounted () {
        this.loaded = false

        // states table data
        fetch('https://disease.sh/v3/covid-19/states?yesterday=true')
            .then(res => res.json())
            .then(data => {
                for(let i = data.length - 1; i >= 0; i--){
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
                    else {
                        this.stateDropdown.push(data[i].state)
                    }
                }
                this.stateDropdown.sort()
                this.stateDropdown.unshift("All States")

                //console.log('state table data = ', data)
                this.states = data
            })

        // countries grid data
        fetch('https://disease.sh/v3/covid-19/countries?yesterday=true&sort=cases')
            .then(res => res.json())
            .then(data => {
                
                this.countries = data
                console.log('this.countries = ', this.countries)
                this.usa = data[0]

                this.usa.casesGrid = this.usa.cases.toLocaleString()
                this.usa.todayCasesGrid = this.usa.todayCases.toLocaleString()
                this.usa.deathsGrid = this.usa.deaths.toLocaleString()
                this.usa.todayDeathsGrid = this.usa.todayDeaths.toLocaleString()
                this.usa.recoveredGrid = this.usa.recovered.toLocaleString()
                this.usa.todayRecoveredGrid = this.usa.todayRecovered.toLocaleString()

                for(let i = 0; i < this.countries.length; i++){
                    this.countryDropdown.push(this.countries[i].country)
                    this.countries[i].state = this.countries[i].country
                }
                this.countryDropdown.unshift("All Countries")
                console.log('usa grid data = ', this.usa)
            })
            

        // global grid data
        fetch('https://disease.sh/v3/covid-19/all')
            .then(res => res.json())
            .then(data => {
                this.global = data
                this.global.cases = this.global.cases.toLocaleString()
                this.global.todayCases = this.global.todayCases.toLocaleString()
                this.global.deaths = this.global.deaths.toLocaleString()
                this.global.todayDeaths = this.global.todayDeaths.toLocaleString()
                this.global.recovered = this.global.recovered.toLocaleString()
                this.global.todayRecovered = this.global.todayRecovered.toLocaleString()

                console.log('global grid data = ', data)
            })
        
        // global vax grid data
        fetch('https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=5')
            .then(res => res.json())
            .then(data => {
                let array = []
                Object.keys(data).forEach(key => {
                    array.push({date: key, totalVaxed: data[key]})
                })
                for(let i = array.length - 1; i > 0; i--){
                    if(array[i].totalVaxed - array[i - 1].totalVaxed > 0){
                        array[4].newVaxed = array[i].totalVaxed - array[i - 1].totalVaxed
                        break
                    }
                }
                console.log('Global vax = ', array)
                this.vaxData.globalTotal = array[4].totalVaxed.toLocaleString()
                this.vaxData.globalNew = array[4].newVaxed.toLocaleString()
                this.vaxKey ++
            })
        
        // USA vax grid data
        fetch('https://disease.sh/v3/covid-19/vaccine/coverage/countries/USA?lastdays=5')
            .then(res => res.json())
            .then(data => {
                data = data.timeline
                let array = []
                Object.keys(data).forEach(key => {
                    array.push({date: key, totalVaxed: data[key]})
                })
                array[4].newVaxed = 0
                for(let i = array.length - 1; i > 0; i--){
                    if(array[i].totalVaxed - array[i - 1].totalVaxed > 1000){
                        array[4].newVaxed = array[i].totalVaxed - array[i - 1].totalVaxed
                        break
                    }
                }
                console.log('USA vax = ', array)
                this.vaxData.usaTotal = array[4].totalVaxed.toLocaleString()
                this.vaxData.usaNew = array[4].newVaxed.toLocaleString()
                this.vaxKey ++
            })
        console.log('vaxData = ', this.vaxData)
        this.getGraphs()

    },
    methods: {
        getGraphs() {
            // https://henry-cors-server.herokuapp.com/https://covidtracking.com/api/us/daily
            fetch(this.graphURL)
                .then(res => res.json())
                .then(data => {
                    if(data.message) {
                        this.error = true
                    }
                    else{
                        this.error = false
                    }
                    if(this.selectedCountry !== "USA" || this.selectedCountry == "All Countries"){
                        let transformedData = this.transformCountryData(data)
                        data = transformedData
                    }

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
                    console.log('graphData = ', data)
                    this.loaded = true

                let dates = data.map(d => d.date)
                let cases = data.map(d => d.cases)
                let deaths = data.map(d => d.deaths)

                let filteredDates = dates
                let filteredCases = cases
                let filteredDeaths = deaths

                let movingAverages = []
                let radius = 0

                if(this.selectedTime == 'All Time') {
                    filteredDates = dates
                    filteredCases = cases
                    filteredDeaths = deaths

                    movingAverages = this.calculateMovingAverage(7, filteredCases, filteredDeaths)
                }
                if(this.selectedTime == 'One Week') {
                    radius = 5
                    filteredDates = dates.slice(-7)
                    filteredCases = cases.slice(-13)    // grab 6 prior days to calc 7 day avg
                    filteredDeaths = deaths.slice(-13)

                    movingAverages = this.calculateMovingAverage(7, filteredCases, filteredDeaths)
                    filteredCases = cases.slice(-7)     // grab days needed for graph
                    filteredDeaths = deaths.slice(-7)
                }
                if(this.selectedTime == 'One Month') {
                    radius = 5
                    filteredDates = dates.slice(-30)
                    filteredCases = cases.slice(-36)    // grab 6 prior days to calc 7 day avg
                    filteredDeaths = deaths.slice(-36)

                    movingAverages = this.calculateMovingAverage(7, filteredCases, filteredDeaths)
                    filteredCases = cases.slice(-30)     // grab days needed for graph
                    filteredDeaths = deaths.slice(-30)
                }
                if(this.selectedTime == 'Six Months') {
                    filteredDates = dates.slice(-180)
                    filteredCases = cases.slice(-186)    // grab 6 prior days to calc 7 day avg
                    filteredDeaths = deaths.slice(-186)

                    movingAverages = this.calculateMovingAverage(7, filteredCases, filteredDeaths)
                    filteredCases = cases.slice(-180)     // grab days needed for graph
                    filteredDeaths = deaths.slice(-180)
                }
                if(this.selectedTime == 'One Year') {
                    filteredDates = dates.slice(-365)
                    filteredCases = cases.slice(-371)    // grab 6 prior days to calc 7 day avg
                    filteredDeaths = deaths.slice(-371)

                    movingAverages = this.calculateMovingAverage(7, filteredCases, filteredDeaths)
                    filteredCases = cases.slice(-365)     // grab days needed for graph
                    filteredDeaths = deaths.slice(-365)
                }

                // console.log('state or usa data = ', data)
                // console.log('filteredDates = ', filteredDates)
                // console.log('filteredCases = ', filteredCases)
                // console.log('filteredDeaths = ', filteredDeaths)

                
                if(this.error) {
                    this.graphKey.cases = `Daily Cases - ERROR: No data found`
                    this.graphKey.deaths = `Daily Deaths - ERROR: No data found`
                    movingAverages = {}
                }
                else if(this.selectedCountry !== "USA" && !this.error){
                    this.graphKey.cases = `Daily Cases - ${this.selectedCountry} - ${this.selectedTime}`
                    this.graphKey.deaths = `Daily Deaths - ${this.selectedCountry} - ${this.selectedTime}`
                }
                else{
                    this.graphKey.cases = `Daily Cases - ${this.selectedState} - ${this.selectedTime}`
                    this.graphKey.deaths = `Daily Deaths - ${this.selectedState} - ${this.selectedTime}`
                }
                
                this.cases = {
                labels: filteredDates,
                datasets: [
                    {
                        label: 'Daily Cases',
                        data: filteredCases,
                        backgroundColor: 'rgb(40, 121, 237)',
                        order: 2
                    },
                    {
                        type: 'line',
                        label: 'Moving Avg',
                        data: movingAverages.cases,
                        borderColor: 'rgb(0, 0, 0, .4)',
                        fill: false,
                        pointRadius: radius,
                        order: 1
                    }
                    ]
                }

                this.deaths = {
                labels: filteredDates,
                datasets: [
                    {
                        label: 'Daily Deaths',
                        data: filteredDeaths,
                        backgroundColor: 'rgb(222, 75, 62)',
                        order: 2
                    },
                    {
                        type: 'line',
                        label: "Moving Avg",
                        data: movingAverages.deaths,
                        borderColor: 'rgb(0, 0, 0, .4)',
                        fill: false,
                        pointRadius: radius,
                        order: 1
                    }
                    
                    ]
                }
            })
        },
        calculateMovingAverage(days, cases, deaths) {
            
            let movingAverageCases = []
            let movingAverageDeaths = []
            let endingPoint = cases.length

            if(this.selectedTime == "All Time") {
                for(let i = 0; i < days - 1; i++) {
                    movingAverageCases.push(0)
                    movingAverageDeaths.push(0)
                }
            }
            else {
                endingPoint = cases.length - days + 1
            }

            let slidingWindowCases = cases.slice(0,days)
            let slidingWindowDeaths = deaths.slice(0,days)

            for(let x = 0; x < endingPoint; x++) {
                let sumCases = 0
                let sumDeaths = 0
                for(let y = 0; y < slidingWindowCases.length; y++){
                    sumCases += slidingWindowCases[y]
                    sumDeaths += slidingWindowDeaths[y]
                }
                movingAverageCases.push(Math.round(sumCases / days))
                movingAverageDeaths.push(Math.round(sumDeaths / days))

                slidingWindowCases.shift()
                slidingWindowDeaths.shift()

                slidingWindowCases.push(cases[x + days])
                slidingWindowDeaths.push(deaths[x + days])
            }

            return {cases: movingAverageCases, deaths: movingAverageDeaths}
        },
        transformCountryData(data) {
            try {
                console.log('data to transform = ', data)

                let casesObj = {}
                let deathsObj = {}

                if(this.selectedCountry !== "All Countries"){
                    casesObj = data.timeline.cases
                    deathsObj = data.timeline.deaths
                }
                else if(this.selectedCountry == "All Countries"){
                    casesObj = data.cases
                    deathsObj = data.deaths
                }

                let array = []
                Object.keys(casesObj).forEach(function(key) {
                    array.push({date: key, cases: casesObj[key], deaths: deathsObj[key]})
                });

                console.log('transformed data = ', array)
                return array



            }
            catch {
                return []
            }
        }
    }

}
</script>

<style>
    select{
        font-size: 100%;
        max-width: 200px;
    }
    .filters{
        text-align: left;
        line-height: 1.5em;
    }

    #error{
        color: red;
        margin-top: 5px;
        font-weight: bold;
    }
</style>