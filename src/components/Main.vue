<template>
  <v-row class="fill-height fill-width" no-gutters>
    <div class="d-flex flex-column align-stretch grow">
      <Actions class="mb-2" v-if="$config.urls.URL_API_ACTIONS"></Actions>
      <v-card height="100%" class="flex-grow-1">
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
    </div>
  </v-row>
</template>

<script>
  import Actions from './Actions';

  export default {
    components: { Actions },
    name: 'Main',

    data() {
      return {
        tab: 0,
        tabs: [ 'city', 'human', 'coordinates']
      }
    }
  }
</script>