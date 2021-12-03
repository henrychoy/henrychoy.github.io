<template>

    <div>
        <h3>
            <img class="covidIcon" id="usaFlag" src="https://img.icons8.com/color/48/000000/usa.png"/> United States
        </h3>

        <section id="covidGrid">
            <div class="card">
                <b>Cases</b> <br>
                {{usa.casesGrid}} <br>
                +{{usa.todayCasesGrid}} <br>
            </div>

            <div class="card">
                <b>Deaths</b> <br>
                <div class="deaths">
                {{usa.deathsGrid}} <br>
                +{{usa.todayDeathsGrid}} <br>
                </div>
            </div>

            <div class="card">
                <b>Recovered</b> <br>
                <div class="recovered">
                {{usa.recoveredGrid}} <br>
                +{{usa.todayRecoveredGrid}} <br>
                </div>
            </div>

            <div class="card">
                <b>Vax Doses</b> <br>
                <div class="recovered">
                {{vaxData.usaTotal}} <br>
                +{{vaxData.usaNew}} <br>
                </div>
            </div>
        </section>

        

        <h3>
            <img class="covidIcon" src="https://img.icons8.com/color/48/000000/globe--v1.png"/> Global
        </h3>

        <section id="covidGrid">
            <div class="card">
                <b>Cases</b> <br>
                {{global.cases}} <br>
                +{{global.todayCases}} <br>
            </div>

            <div class="card">
                <b>Deaths</b> <br>
                <div class="deaths">
                {{global.deaths}} <br>
                +{{global.todayDeaths}} <br>
                </div>
            </div>

            <div class="card">
                <b>Recovered</b> <br>
                <div class="recovered">
                {{global.recovered}} <br>
                +{{global.todayRecovered}} <br>
                </div>
            </div>

            <div class="card">
                <b>Vax Doses</b> <br>
                <div class="recovered">
                {{vaxData.globalTotal}} <br>
                +{{vaxData.globalNew}} <br>
                </div>
            </div>
        </section>
    </div>
    
</template>

<script>
export default {
    props: ['usa', 'global', 'vaxData'],

}
</script>

<style>

    .covidIcon{
        vertical-align: bottom;
        margin-bottom: -5px;
    }

    #usaFlag{
        
        margin-bottom: -5px;
    }

    .deaths{
        color: red;
    }

    .recovered{
        color: green;
    }

    @media only screen and (max-width: 600px) {
        .covidIcon{
            width: 10%;
            margin-bottom: -5px;
        }

    }

    #covidGrid{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 5px;
        text-align: center;
        margin: auto;
    }

    .card{
        border: solid black 1px;
        padding: 5px;
        border-radius: 4px;
        
        color: black;
        display: inline;
        /* min-width: 240px; */
    }


</style>