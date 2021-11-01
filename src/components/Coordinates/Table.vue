<template>
  <v-data-table
    :loading="loading"
    :headers="headers"
    :items="items"
  >
  </v-data-table>
</template>

<script>
  export default {
    name: 'HumanTable',

    data() {
      return {
        items: [],
        total: 0,
        itemsPerPage: 10,
        loading: false
      };
    },

    computed: {
      pagesAmount() {
        return Math.ceil(this.total / this.itemsPerPage)
      },

      headers() {
        return [
          {
            text: 'Id',
            align: 'center',
            sortable: false,
            value: 'id',
          },
          {
            text: 'X',
            align: 'center',
            sortable: false,
            value: 'x',
          },
          {
            text: 'Y',
            align: 'center',
            sortable: false,
            value: 'y',
          },
        ]
      },
    },

    methods: {
      getItems() {
        this.$api.coordinates.get()
        .then( ({data}) => {
          this.items = data.results;
          this.total = data.total;
        })
      },
    },

    mounted() {
      this.getItems();
    }
  }
</script>
