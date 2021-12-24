<template>
  <transition-group
    name="alert-transition"
    tag="div"
    class="col-12 col-md-5 col-lg-3 col-xl-3 fill-height ma-0 pa-4 pl-xl-10 pl-lg-10 px-sm-4 px-xs-2"
    style="position: absolute;"
  >
    <v-alert
      v-for="{ type, id, title, text } in alerts"
      :type="type"
      :key="id"
      small
      dense
      class="align-center"
      style="z-index: 10000;"
      max-width="100%"
    >
      <div class="text-hyphens">
        <div
          v-if="title"
          class="title"
        >
          {{ title }}
        </div>

        <div class="body-2">
          {{ text }}
        </div>
      </div>

      <template v-slot:append>
        <v-btn
          @click="deleteById(id)"
          icon
        >
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-alert>
  </transition-group>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: "AppAlerts",

    computed: {
      ...mapState({
        alerts: state => state.alerts.alerts,
      }),
    },

    methods: {
      ...mapActions({
        deleteById: 'alerts/deleteById',
      }),
    },
  };
</script>

<style>
  .align-center .v-alert__icon {
    align-self: center !important;
  }

  .alert-transition-enter, .alert-transition-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }

  .alert-transition-leave-active {
    position: absolute;
  }
</style>