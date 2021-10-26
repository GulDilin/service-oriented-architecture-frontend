<template>
  <v-app
    id="app"
    dark
  >
    <div class="display-1 font-weight-black primary--text text--darken-3 grey pa-4 text-center">
      Service Oriented Architecture
    </div>

    <AppAlerts/>

    <v-main class="grey">
      <v-container class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import AppAlerts from "@/components/AppAlerts";

  export default {
    name: 'App',

    components: {
      AppAlerts,
    },

    data() {
      return {

      };
    },
  };
</script>

<style>
  .text-hyphens {
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
</style>
