<template>
  <v-card class="mb-2">
    <v-card-title>
      Actions
    </v-card-title>
    <v-card-text>
      <div class="d-flex flex-column" style="gap: 8px;">
        <div class="d-flex flex-row " style="gap: 8px;">
          <v-btn
            color="pimary"
            outlined
            @click="calcDistToMaxPopulated"
            :loading="loadingC"
          >
            Calculate distance to max populated
          </v-btn>

          <template v-if="distancePop !== null">
            <div class="title mx-2 ml-4">
              Result:
            </div>
              <v-chip label color="blue">{{ distancePop }}</v-chip>
          </template>
        </div>
        <div class="d-flex flex-row my-1 align-center" style="gap: 8px;">
          <div>
            <v-text-field
              v-model="id1"
              placeholder="City 1 id"
              label="City 1 id"
              hide-details
              outlined
              dense
            >
            </v-text-field>
          </div>

          <div>
            <v-text-field
              v-model="id2"
              placeholder="City 2 id"
              label="City 2 id"
              outlined
              hide-details
              dense
            >
            </v-text-field>
          </div>

          <v-btn
            color="pimary"
            outlined
            @click="calcDistBtw"
            :loading="loadingD"
          >
            Calculate distance
          </v-btn>

          <template v-if="distanceC !== null">
            <div class="title mx-2 ml-4">
              Result distance btn {{ id1C }} and {{ id2C }} :
            </div>
              <v-chip label color="blue">{{ distanceC }}</v-chip>
          </template>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'Actions',

    data() {
      return {
        distancePop: null,
        distanceC: null,
        loadingC: false,
        loadingD: false,
        id1: null,
        id2: null,
        id1C: null,
        id2C: null,
      }
    },

    methods: {
      calcDistToMaxPopulated() {
        this.loadingC = true;
        this.$api.actions.getDistanceToMaxPopulated()
          .then( ({data}) => {
            this.distancePop = data?.length;
          })
          .finally( () => {
            this.loadingC = false;
          });
      },

      calcDistBtw() {
        this.loadingD = true;
        const { id1, id2 } = this;
        this.$api.actions.getDistanceBetweenCitites(id1, id2)
          .then(({data}) => {
            this.distanceC = data?.length;
            this.id1C = id1;
            this.id2C = id2;
          })
          .finally( () => {
            this.loadingD = false;
          });
      }
    }
  }
</script>