<template>
  <AppItemsTable
    :headers="headers"
    api-name="human"
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
            text: 'Birthday',
            align: 'center',
            sortable: false,
            value: 'birthday',
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
