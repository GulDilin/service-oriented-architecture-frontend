<template>
  <v-form ref="form">
    <v-row no-gutters class="pa-4">
      <v-col>
        <v-text-field
          :value="x"
          label="x"
          dense
          outlined
          placeholder="x"
          @input="$emit('update:x', $event)"
        >
        </v-text-field>
        <v-text-field
          :value="y"
          label="y"
          dense
          outlined
          placeholder="y"
          @input="$emit('update:y', $event)"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
  export default {
    name: 'CityForm',

    props: {
      x: {
        type: [String, Number]
      },
      y: {
        type: [String, Number]
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
