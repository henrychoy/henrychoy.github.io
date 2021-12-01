<template>

    <div>
        <h3>
            <img class="covidIcon" id="usaFlag" src="https://img.icons8.com/color/48/000000/usa.png"/> United States
        </h3>

        <section id="grid">
            <div class="card">
                <b>Total Cases</b> <br>
                {{usa.casesGrid}} <br>
                +{{usa.todayCasesGrid}} <br>
            </div>

            <div class="card">
                <b>Total Deaths</b> <br>
                <div class="deaths">
                {{usa.deathsGrid}} <br>
                +{{usa.todayDeathsGrid}} <br>
                </div>
            </div>

            <div class="card">
                <b>Total Vax Doses</b> <br>
                <div class="recovered">
                {{usa.totalVaxed}} <br>
                +{{usa.newVaxed}} <br>
                </div>
            </div>
        </section>

        

        <h3>
            <img class="covidIcon" src="https://img.icons8.com/color/48/000000/globe--v1.png"/> Global
        </h3>

        <section id="grid">
            <div class="card">
                <b>Total Cases</b> <br>
                {{global.cases}} <br>
                +{{global.todayCases}} <br>
            </div>

            <div class="card">
                <b>Total Deaths</b> <br>
                <div class="deaths">
                {{global.deaths}} <br>
                +{{global.todayDeaths}} <br>
                </div>
            </div>

            <div class="card">
                <b>Total Vax Doses</b> <br>
                <div class="recovered">
                {{global.totalVaxed}} <br>
                +{{global.newVaxed}} <br>
                </div>
            </div>
        </section>
    </div>
    
</template>

<script>
export default {
    props: ['usa', 'global'],

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


</style>