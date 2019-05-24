<template>
  <div >
      <v-toolbar
        color="blue darken-3"
        class="headline"
      >
        <v-btn 
          large 
          icon
          @click="backHome"
        >
          <v-avatar size="45px" tile>
            <img
            src="../components/logo.png"
            alt="Nomu"
            >
          </v-avatar>
        </v-btn>

        <v-toolbar-title class="white--text">Nomu Maps</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-icon class="white--text" large>location_on</v-icon>

      </v-toolbar>

      <google-map class="home headline"></google-map>

      <v-footer
        dark
        height="auto"
        app
      >
        <v-card
          class="flex"
          flat
          tile
        >
          <v-card-actions class="grey darken-3 justify-center">
            &copy;2019 — <strong>Nomu</strong>
          </v-card-actions>
        </v-card>
      </v-footer>
  </div>
</template>

<script>
  import GoogleMap from './GoogleMap'
  import { db } from '../main'

  export default{
    name: 'home',
    data () {
      return {
        title:'Home',
        markers: []
      }
    },
    components: {
      GoogleMap
    }
  }
</script>
