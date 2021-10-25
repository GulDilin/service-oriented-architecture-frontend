<template>
  <v-form ref="form">
    <v-row no-gutters class="pa-4">
      <v-col>
        <v-text-field
          :value="name"
          label="Name"
          dense
          outlined
          placeholder="Name"
        >
        </v-text-field>
        <v-text-field
          :value="governor"
          label="Governor Id"
          dense
          outlined
          placeholder="Governor Id"
        >
        </v-text-field>
        <v-text-field
          :value="coordinates"
          label="Coordinates Id"
          dense
          outlined
          placeholder="Coordinates Id"
        >
        </v-text-field>
        <v-text-field
          :value="population"
          label="Population"
          dense
          outlined
          placeholder="Population"
        >
        </v-text-field>
        <v-text-field
          :value="populationDensity"
          label="populationDensity"
          dense
          outlined
          placeholder="populationDensity"
        >
        </v-text-field>
        <v-text-field
          :value="area"
          label="area"
          dense
          outlined
          placeholder="area"
        >
        </v-text-field>
        <v-text-field
          :value="carCode"
          label="carCode"
          dense
          outlined
          placeholder="carCode"
        >
        </v-text-field>
        <v-text-field
          :value="metersAboveSeaLevel"
          label="metersAboveSeaLevel"
          dense
          outlined
          placeholder="metersAboveSeaLevel"
        >
        </v-text-field>
        <v-select
          :value="climate"
          label="Climate"
          dense
          outlined
          placeholder="Climate"
          :items="$enums.Climate.getValues()"
          item-text="key"
          item-value="key"
        >
        </v-select>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
  export default {
    name: 'CityForm',

    props: {
      name: {
        type: String,
      },
      governor: {
        type: Number,
      },
      coordinates: {
        type: Number,
      },
      climate: {
        type: String,
      },
      area: {
        type: Number,
      },
      population: {
        type: Number,
      },
      metersAboveSeaLevel: {
        type: Number,
      },
      populationDensity: {
        type: Number,
      },
      carCode: {
        type: Number,
      },
    },

    methods: {
      reset() {
        this.$refs.form.reset();
      },

      validate() {
        return this.$refs.form.validate();
      },
    }
  }
</script>
