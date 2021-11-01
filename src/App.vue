<template>
  <v-app
    id="app"
    dark
  >
        <div class="display-1 font-weight-black primary--text text--darken-3 grey pa-4 text-center">
          Service Oriented Architecture
        </div>
    <v-main class="grey">
      <v-container class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data() {
    return {

    };
  },
};
</script>
