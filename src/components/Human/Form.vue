<template>
  <v-form ref="form">
    <v-row no-gutters class="pa-4">
      <v-col>
        <v-text-field
          :value="birthday"
          label="Birthday"
          dense
          outlined
          placeholder="Birthday"
          @input="$emit('update:birthday', $event)"
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
      birthday: {
        type: String
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
