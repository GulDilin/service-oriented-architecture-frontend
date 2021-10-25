<template>
  <AppItemsTable
    :headers="headers"
    api-name="coordinates"
  >
  </AppItemsTable>
</template>

<script>
  import AppItemsTable from '@/components/AppItemsTable';

  export default {
    name: 'HumanTable',

    components: {
      AppItemsTable,
    },

    data() {
      return {
      };
    },

    computed: {
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
          {
            text: 'Actions',
            value: 'actions',
            align: 'center',
            sortable: false
          },
        ]
      },
    },
  }
</script>
