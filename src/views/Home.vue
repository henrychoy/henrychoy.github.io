<template>
  <v-container fluid style="position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%);">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <p class="text-h3 stretch-text">Hi, my name is Henry</p>
        <a href="https://github.com/henrychoy/henrychoy.github.io" target="_blank">GitHub Repo</a>
      </v-col>
    </v-row>
  </v-container>

  <canvas ref="canvas" />
</template>

<script>
import WebGLFluid from 'webgl-fluid'

export default {
  name: 'Home',
  mounted() {
    // https://thiagoamaral.vercel.app/
    // https://github.com/cloydlau/webgl-fluid
    WebGLFluid(this.$refs.canvas)
  }
}
</script>

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>