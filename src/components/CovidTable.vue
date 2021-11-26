<template>

    <div>
        <h3 id="statesHeader">
            <i class="material-icons" v-if="showStates" @click="toggleStates">expand_less</i>
            <i class="material-icons" v-if="!showStates" @click="toggleStates">expand_more</i>
            {{title}}
        </h3>
        <div v-if="showStates">
        <table class="sticky-header">
            <tr>
                <th @click="sortStateName">{{item}}
                <i class="material-icons" v-if="!stateNameAscending && stateNameAscending !== null">expand_more</i>
                <i class="material-icons" v-if="stateNameAscending">expand_less</i>
                </th>
                <th @click="sortStateNewCases">New Cases
                <i class="material-icons" v-show="!stateNewCasesAscneding && stateNewCasesAscneding !== null">expand_more</i>
                <i class="material-icons" v-show="stateNewCasesAscneding">expand_less</i>
                </th>
                <th @click="sortStateNewDeaths">New Deaths
                <i class="material-icons" v-show="!stateNewDeathsAscneding && stateNewDeathsAscneding !== null">expand_more</i>
                <i class="material-icons" v-show="stateNewDeathsAscneding">expand_less</i>
                </th>
                <th @click="sortStateTotalCases">Total Cases
                <i class="material-icons" v-show="!stateTotalCasesAscneding && stateTotalCasesAscneding !== null">expand_more</i>
                <i class="material-icons" v-show="stateTotalCasesAscneding">expand_less</i>
                </th>
                <th @click="sortStateTotalDeaths">Total Deaths
                <i class="material-icons" v-show="!stateTotalDeathsAscneding && stateTotalDeathsAscneding !== null">expand_more</i>
                <i class="material-icons" v-show="stateTotalDeathsAscneding">expand_less</i>
                </th>
            </tr>
            <tr v-for="item in list" :key="item.state">
                <td class='row-name'>{{item.state}}</td>
                <td>{{item.todayCases.toLocaleString()}}</td>
                <td>{{item.todayDeaths.toLocaleString()}}</td>
                <td>{{item.cases.toLocaleString()}}</td>
                <td>{{item.deaths.toLocaleString()}}</td>
            </tr>
        </table>
        </div>
    </div>

</template>

<script>
export default {
    props: ['list', 'title', 'item'],
    data() {
        return {
            showStates: true,

            stateNameAscending: null,
            stateNewCasesAscneding: null,
            stateNewDeathsAscneding: null,
            stateTotalCasesAscneding: null,
            stateTotalDeathsAscneding: null,
            countryNameAscneding: null,
            
        }
    },
    methods: {
        toggleStates(){
            this.showStates = !this.showStates;
        },
        sortStateName(){
            this.stateNewCasesAscneding = null;
            this.stateNewDeathsAscneding = null;
            this.tateTotalCasesAscneding = null;
            this.stateTotalDeathsAscneding = null;
            this.stateNameAscending = !this.stateNameAscending;
            if(this.stateNameAscending){
                this.list.sort(function(a, b) {
                var nameA = a.state.toUpperCase(); // ignore upper and lowercase
                var nameB = b.state.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
                });
            }
            else{
                this.list.sort(function(b, a) {
                var nameA = a.state.toUpperCase(); // ignore upper and lowercase
                var nameB = b.state.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                // names must be equal
                return 0;
                });
            }
        },
        sortStateNewCases(){
            this.stateNameAscending = null;
            this.stateNewDeathsAscneding = null;
            this.stateTotalCasesAscneding = null;
            this.stateTotalDeathsAscneding = null;
            this.stateNewCasesAscneding = !this.stateNewCasesAscneding
            if(this.stateNewCasesAscneding){
                this.list.sort(function (a, b) {
                return a.todayCases - b.todayCases;
                });
            }
            else{
                this.list.sort(function (b, a) {
                return a.todayCases - b.todayCases;
                });
            }
            console.log(this.list)
        },
        sortStateNewDeaths(){
            this.stateNameAscending = null;
            this.stateNewCasesAscneding = null;
            this.stateTotalCasesAscneding = null;
            this.stateTotalDeathsAscneding = null;
            this.stateNewDeathsAscneding = !this.stateNewDeathsAscneding
            if(this.stateNewDeathsAscneding){
                this.list.sort(function (a, b) {
                return a.todayDeaths - b.todayDeaths;
                });
            }
            else{
                this.list.sort(function (b, a) {
                return a.todayDeaths - b.todayDeaths;
                });
            }
        },
        sortStateTotalCases(){
            this.stateNameAscending = null;
            this.stateNewCasesAscneding = null;
            this.stateNewDeathsAscneding = null;
            this.stateTotalDeathsAscneding = null;
            this.stateTotalCasesAscneding = !this.stateTotalCasesAscneding
            if(this.stateTotalCasesAscneding){
                this.list.sort(function (a, b) {
                return a.cases - b.cases;
                });
            }
            else{
                this.list.sort(function (b, a) {
                return a.cases - b.cases;
                });
            }
        },
        sortStateTotalDeaths(){
            this.stateNameAscending = null;
            this.stateNewCasesAscneding = null;
            this.stateNewDeathsAscneding = null;
            this.stateTotalCasesAscneding = null;
            this.stateTotalDeathsAscneding = !this.stateTotalDeathsAscneding
            if(this.stateTotalDeathsAscneding){
                this.list.sort(function (a, b) {
                return a.deaths - b.deaths;
                });
            }
            else{
                this.list.sort(function (b, a) {
                return a.deaths - b.deaths;
                });
            }
        },
        sortCountryName(){
            this.countryNameAscneding = !this.countryNameAscneding;
            if(this.countryNameAscneding){
                this.countries.sort(function(a, b) {
                var nameA = a.country.toUpperCase(); // ignore upper and lowercase
                var nameB = b.country.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
                });
            }
            else{
                this.countries.sort(function(b, a) {
                var nameA = a.country.toUpperCase(); // ignore upper and lowercase
                var nameB = b.country.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                // names must be equal
                return 0;
                });
            }
        },

    }
}
</script>

<style>
    #statesHeader{
        margin-left: -10px;
        text-align: left;
    }

    @media only screen and (max-width: 600px) {

        th{
            padding-left: 8px;
            
        }
        th i{
            font-size: 1.4em !important;
            padding: 0;
            margin: 0;
        }
        td{
            padding: 1px;
        }


    }
</style>