<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link :to="{name: 'Stocks'}">Stocks</router-link> |
      <router-link :to="{name: 'Covid'}">Covid</router-link> |
      <router-link :to="{name: 'ToDo'}">To-Do</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
       
}

#app {
  font-family: Verdana, Arial, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: auto;
  width: 95vw;
  max-width: 1000px;
  /* outline: 1px solid red; */
}


#nav {
  margin: 20px 0px;
  padding: 0;
  font-size: 18px;
  white-space: nowrap;

}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
}

#nav a.router-link-exact-active {
  color: white;
  background: rgb(93, 93, 223);
}

h3 {
  text-align: left;
  padding-left: 10px;
  margin-bottom: 5px;
}

#grid{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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


.material-icons{
  vertical-align: bottom;

  margin-bottom: -.1em;
}

table{
  table-layout: fixed;
  width: 100%;
  
}

@media only screen and (max-width: 600px) {
  * {
    font-size: 1.3vh
  }
  th, td{
    font-size: 1vh;
  }
  h3{
    font-size: 1.5vh;
  }

}

th, td{
    padding: 5px 10px;
    
}

th{
    text-transform: uppercase;
    text-align: left;
    min-width: 186px;
    line-height: 1.5em;
}



.sticky-header th{
    position: sticky;
    top: 0;
    background-color: #3e4d5e;
    color: white;
}

tr{
    text-align: right;
    line-height: 1em;
}

td.row-name{
    text-align: left;
}

table tr:nth-child(even) td {
    background-color: lightgray;
}
</style>
