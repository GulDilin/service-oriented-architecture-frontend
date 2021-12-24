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
          @input="$emit('update:name', $event)"
        >
        </v-text-field>
        <v-text-field
          :value="governor"
          label="Governor Id"
          dense
          outlined
          placeholder="Governor Id"
          @input="$emit('update:governor', $event)"
        >
        </v-text-field>
        <v-text-field
          :value="coordinates"
          label="Coordinates Id"
          dense
          outlined
          placeholder="Coordinates Id"
          @input="$emit('update:coordinates', $event)"
        >
        </v-text-field>
        <v-text-field
          :value="population"
          label="Population"
          dense
          outlined
          placeholder="Population"
          @input="$emit('update:population', $event)"
        >
        </v-text-field>
        <v-text-field
          :value="populationDensity"
          label="populationDensity"
          dense
          outlined
          placeholder="populationDensity"
          @input="$emit('update:population-density', $event)"
        >
        </v-text-field>
        <v-text-field
          :value="area"
          label="area"
          dense
          outlined
          placeholder="area"
          @input="$emit('update:area', $event)"
        >
        </v-text-field>
        <v-text-field
          :value="carCode"
          label="carCode"
          dense
          outlined
          placeholder="carCode"
          @input="$emit('update:car-code', $event)"
        >
        </v-text-field>
        <v-text-field
          :value="metersAboveSeaLevel"
          label="metersAboveSeaLevel"
          dense
          outlined
          placeholder="metersAboveSeaLevel"
          @input="$emit('update:meters-above-sea-level', $event)"
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
          @input="$emit('update:climate', $event)"
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
        type: [String, Number]
      },
      coordinates: {
        type: [String, Number]
      },
      climate: {
        type: String,
      },
      area: {
        type: [String, Number]
      },
      population: {
        type: [String, Number]
      },
      metersAboveSeaLevel: {
        type: [String, Number]
      },
      populationDensity: {
        type: [String, Number]
      },
      carCode: {
        type: [String, Number]
      },
    },

    data() {
      return {
      };
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
