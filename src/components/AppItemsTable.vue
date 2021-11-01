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

    <v-dialog
      v-model="dialogFilter"
      max-width="900"
      min-height="100"
    >
      <v-card
        min-height="100"
      >
        <v-card-title>
          Filtering
        </v-card-title>
        <v-card-text>
          <div
            v-for="header in filterableHeadersV"
            :key="header.value"
            class="title d-flex flex-row align-center py-2"
          >
            <div class="flex-equal">
              {{ header.text }}
            </div>
            <div class="flex-equal px-1">
              <v-select
                :value="header.filterMode"
                outlined
                dense
                :items="$enums.Filtering.getValues()"
                item-text="text"
                item-value="key"
                hide-details
                @input="setFilterMode(header.value, $event)"
              >
              </v-select>
            </div>
            <div class="flex-equal px-1">
              <v-text-field
                :value="header.filterValue"
                outlined
                dense
                hide-details
                clearable
                @input="setFilterValue(header.value, $event)"
              >
              </v-text-field>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogSorting"
      max-width="600"
      min-height="100"
    >
      <v-card
        min-height="100"
      >
        <v-card-title>
          Sorting
        </v-card-title>
        <v-card-text>
          <div
            v-for="header in sortableHeadersV"
            :key="header.value"
            class="title d-flex flex-row align-center"
          >
            <div class="mr-4" style="min-width: 300px;">
              {{ header.text }}
            </div>
            <v-icon
              :color="header.sortingMode === $enums.SortingMode.ASC ? 'primary' : undefined"
              @click="setSoringMode(header.value, $enums.SortingMode.ASC)"
            >
              mdi-arrow-up
            </v-icon>
            <v-icon
              :color="header.sortingMode === $enums.SortingMode.DESC ? 'primary' : undefined"
              @click="setSoringMode(header.value, $enums.SortingMode.DESC)"
            >
              mdi-arrow-down
            </v-icon>
            <v-icon
              :color="!header.sortingMode ? 'primary' : undefined"
              @click="setSoringMode(header.value, undefined)"
            >
              mdi-close
            </v-icon>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      :page.sync="page"
      hide-default-footer
    >
      <template #top>
        <v-row no-gutters class="grey lighten-2 px-4">
          <v-btn
            icon
            outlined
            class="ma-2"
            color="secondary"
            @click="activateFilter"
          >
            <v-icon>mdi-filter</v-icon>
          </v-btn>
          <v-btn
            icon
            outlined
            class="ma-2"
            color="secondary"
            @click="activateSorting"
          >
            <v-icon>mdi-sort</v-icon>
          </v-btn>
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

    props: [ 'apiName', 'headers', 'updateKey', 'sortableHeaders', 'filterableHeaders' ],

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

        dialogFilter: false,
        dialogSorting: false,
        sortableHeadersV: [],
        filterableHeadersV: [],
        sortingFilter: [],
        filterFields: {},
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
      },

      headers: {
        deep: true,
        immediate: true,
        handler() {
          this.updateSortableHeadersV();
          this.updateFilterableHeadersV();
        },
      },

      sortableHeadersV: {
        deep: true,
        immediate: true,
        handler: 'updateSortingFilter',
      },

      filterableHeadersV: {
        deep: true,
        immediate: true,
        handler: 'updateFieldFilter',
      },

      filterO: {
        deep: true,
        immediate: true,
        handler: 'getItems',
      },
    },

    computed: {
      pagesAmount() {
        return Math.ceil(this.total / this.itemsPerPage)
      },

      filterO() {
        const { page, itemsPerPage, sortingFilter, filterFields } = this;
        let offset = (+page - 1) * itemsPerPage;
        return {
          ...filterFields,
          offset: offset,
          limit: itemsPerPage,
          sorting: sortingFilter,
        };
      },
    },

    methods: {
      updateSortableHeadersV() {
        let { headers, sortableHeaders } = this;
        headers ??= [];
        sortableHeaders ??= [];
        console.log({headers, sortableHeaders})
        this.sortableHeadersV = headers?.filter( it => sortableHeaders.includes(it.value) ) ?? [];
      },

      updateFilterableHeadersV() {
        let { headers, filterableHeaders } = this;
        headers ??= [];
        filterableHeaders ??= [];
        console.log({headers, filterableHeaders})
        this.filterableHeadersV = headers?.filter( it => filterableHeaders.includes(it.value) ) ?? [];
      },

      updateSortingFilter() {
        this.sortingFilter = this.sortableHeadersV
        .filter( h => !!h.sortingMode )
        .map( ({ value, sortingMode })=> `${sortingMode.value}${value}`);
      },

      updateFieldFilter() {
        let fields = {};
        this.filterableHeadersV
        .filter( h => !!h.filterValue )
        .forEach( ({ filterMode, value, filterValue }) => {
          fields[value] = `${filterMode}:${filterValue}`;
        });
        this.filterFields = fields;
      },

      setFilterValue(header, value) {
        let headerObj = this.headers.find( it => it.value === header );
        this.$set(headerObj, 'filterValue', value);
      },

      setFilterMode(header, mode) {
        let headerObj = this.headers.find( it => it.value === header );
        this.$set(headerObj, 'filterMode', mode);
      },

      getItems() {
        this.loading = true
        this.$api[this.apiName].get(this.filterO)
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

      activateFilter() {
        this.dialogFilter = true;
      },

      activateSorting() {
        this.dialogSorting = true;
      },

      setSoringMode(header, mode) {
        let headerObj = this.headers.find( it => it.value === header );
        this.$set(headerObj, 'sortingMode', mode);
      },
    },
  }
</script>
