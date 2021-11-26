<template>

    <div>
        <h3 class="stockHeader">
            <i class="material-icons" v-if="showIndex" @click="toggleIndex">expand_less</i>
            <i class="material-icons" v-if="!showIndex" @click="toggleIndex">expand_more</i>
            {{title}}
        </h3>
        <section id="grid" v-if="showIndex">
            <div class="card" v-for="stock in list" :key="stock.symbol" :class="stock.netChange > 0 ? 'positiveBkg' : 'negativeBkg'">
                <img v-if="'currency' in stock" class="stockLogo" :src="stock.logo_url" alt="">
                <img v-if="stock.assetType === 'EQUITY'" class="stockLogo" :src="`https://storage.googleapis.com/iex/api/logos/`+stock.symbol+'.png'" alt="">
                <i v-if="stock.user === true" @click="close(stock)" class="material-icons" id="close">close</i>
                {{stock.symbol}}  <br>
                {{stock.lastPrice.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
                })}}  <br>
                <div class="change" :class="stock.netChange > 0 ? 'positiveNum' : 'negativeNum'">
                <i class="material-icons" v-show="stock.netChange > 0">arrow_upward</i>
                <i class="material-icons" v-show="stock.netChange < 0">arrow_downward</i>
                {{stock.netChange.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
                })}}
                ({{stock.netPercentChangeInDouble.toFixed(2)+'%'}})
                </div>
                <br>
                
            </div>
        </section>
    </div>

</template>

<script>
export default {
    emits: ["close"],
    props: ['title', 'list', 'crypto'],
    data() {
        return {
            showIndex: true,
            showCrypto: true,
        }
    },
    methods: {
        toggleIndex(){
            this.showIndex = !this.showIndex;
        },
        toggleCrypto(){
            this.showCrypto = !this.showCrypto;
        },
        close(stock){
            this.$emit('close', stock)
        }
    }

}
</script>

<style>

    .stockLogo{
        width: 12%;
        float: left;
        
    }

    #close{
        float: right;
    }

    .positiveBkg{
    background-color: #d5f8cb;
    }
    .positiveNum{
        color: darkgreen;
    }

    .negativeBkg{
    background-color: #f7b9b9;
    }
    .negativeNum{
        color: red;
    }

    .change{
        display: inline;
    }


</style>