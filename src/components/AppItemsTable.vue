<template>
  <div>
    <div class="text-center pt-2 d-flex flex-row align-center">
      <div class="pa-4 title">
        Total items: {{ total }}
      </div>
      <v-spacer></v-spacer>
      <v-pagination
        v-model="page"
        :length="pagesAmount"
      ></v-pagination>
    </div>

    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      :page.sync="page"
      hide-default-footer
    >
      <template #top>
        <v-row no-gutters class="grey lighten-2">
          <v-spacer></v-spacer>
          <v-btn
            icon
            outlined
            class="ma-2"
            color="secondary"
            @click="getItems()"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn
            icon
            outlined
            class="ma-2"
            color="primary"
            @click="$emit('click:add')"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-row>
        <v-divider></v-divider>
      </template>

      <template #item.actions="{ item }">
        <v-btn
          icon
          class="mr-2"
          @click="$emit('click:edit', item)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn
          icon
          @click="openSureDialog(item)"
          color="error"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>

      <template
        v-for="h in headers"
        v-slot:[`header.${h}`]="header"
      >
        {{ header }}
      </template>
    </v-data-table>

    <v-divider></v-divider>
    <v-dialog v-model="sureDeleteDialog" max-width="400">
      <v-card >
        <v-card-title>
          Warning delete
        </v-card-title>
        <v-card-text>
          Are you sure that you want to delete item?
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-btn color="secondary" @click="sureDeleteDialog = false">Cancel</v-btn>
          <v-btn
            :loading="loadingDelete"
            color="error"
            @click="deleteItem(itemAction)"
          >Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'AppItemsTable',

    props: [ 'apiName', 'headers', 'updateKey' ],

    data() {
      return {
        items: [],
        item: undefined,
        total: 0,
        page: 1,
        itemsPerPage: 10,
        loading: false,
        sureDeleteDialog: false,
        loadingDelete: false,
      };
    },

    watch: {
      updateKey: {
        handler() {
          this.getItems();
        },
      },

      page: {
        immediate: true,
        handler() {
          this.getItems();
        },
      },

      pagesAmount: {
        handler() {
          this.page = 1;
        }
      }
    },

    computed: {
      pagesAmount() {
        return Math.ceil(this.total / this.itemsPerPage)
      },
    },

    methods: {
      getItems() {
        const { page, itemsPerPage } = this;
        let offset = (+page - 1) * itemsPerPage;
        this.loading = true
        this.$api[this.apiName].get({
          offset: offset,
          limit: itemsPerPage,
        })
        .then( ({data}) => {
          this.items = data.results;
          this.total = data.total;
        })
        .finally( () => {
          this.loading = false;
        })
      },

      openSureDialog(item) {
        this.sureDeleteDialog = true;
        this.itemAction = item;
      },

      deleteItem({ id }) {
        this.loadingDelete = true;
        this.$api[this.apiName].delete(id)
        .finally( () => {
          this.loadingDelete = false;
          this.sureDeleteDialog = false;
          this.getItems();
        })
      },
    },
  }
</script>
