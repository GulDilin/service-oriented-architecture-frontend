<template>
  <v-row class="fill-height">
    <v-col>
      <v-card height="100%">
        <v-tabs
          dark
          v-model="tab"
          grow
          color="primary"
        >
          <v-tab
            v-for="tab in tabs"
            :key="tab"
            :to="{ name: tab }"
            class="text-capitalize"
          >
            {{ tab }}
          </v-tab>
        </v-tabs>

        <router-view name="content"></router-view>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'Main',

    data() {
      return {
        tab: 0,
        tabs: [ 'city', 'human', 'coordinates']
      }
    }
  }
</script>