<template>
  <div>
    <AppItemsTable
      :headers="headers"
      api-name="city"
      :sortableHeaders="[ 'id', 'coordinatesId', 'creationDate', 'governorId', 'name', 'population',
        'populationDensity', 'carCode', 'metersAboveSeaLevel' ]"
      :filterableHeaders="[ 'id', 'coordinatesId', 'creationDate', 'governorId',
        'name', 'climate', 'population', 'populationDensity', 'carCode', 'metersAboveSeaLevel' ]"
      :update-key="updateKey"
      @click:add="creationDialog = true"
      @click:edit="editItem"
    >
    </AppItemsTable>

    <v-dialog
      v-model="creationDialog"
      max-width="600"
    >
      <v-card max-width="600">
        <v-card-title>
          Create City
        </v-card-title>
        <city-form
          ref="form"
          :name.sync="item.name"
          :governor.sync="item.governor"
          :coordinates.sync="item.coordinates"
          :climate.sync="item.climate"
          :area.sync="item.area"
          :population.sync="item.population"
          :metersAboveSeaLevel.sync="item.metersAboveSeaLevel"
          :populationDensity.sync="item.populationDensity"
          :carCode.sync="item.carCode"
        ></city-form>
        <v-card-actions class="pb-4">
          <v-btn color="secondary" @click="creationDialog = false">Cancel</v-btn>
          <v-btn
            :loading="loadingCreate"
            color="primary"
            @click="createItem()"
          >Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="editingDialog"
      max-width="600"
    >
      <v-card max-width="600">
        <v-card-title>
          Edit City with id {{ editable.id }}
        </v-card-title>
        <city-form
          ref="formEdit"
          :name.sync="editable.name"
          :governor.sync="editable.governor"
          :coordinates.sync="editable.coordinates"
          :climate.sync="editable.climate"
          :area.sync="editable.area"
          :population.sync="editable.population"
          :metersAboveSeaLevel.sync="editable.metersAboveSeaLevel"
          :populationDensity.sync="editable.populationDensity"
          :carCode.sync="editable.carCode"
        ></city-form>
        <v-card-actions class="pb-4">
          <v-btn color="secondary" @click="editingDialog = false">Cancel</v-btn>
          <v-btn
            :loading="loadingEdit"
            color="primary"
            @click="saveEditable()"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import AppItemsTable from '@/components/AppItemsTable';
  import CityForm from './Form';

  export default {
    name: 'CityTable',

    components: {
      AppItemsTable,
      CityForm,
    },

    data() {
      return {
        creationDialog: false,
        editingDialog: false,
        loadingCreate: false,
        loadingEdit: false,
        updateKey: 1,

        item: {
          name: null,
          governor: null,
          coordinates: null,
          climate: null,
          area: null,
          population: null,
          metersAboveSeaLevel: null,
          populationDensity: null,
          carCode: null,
        },

        editable: {},
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
            text: 'Creation Date',
            align: 'center',
            sortable: false,
            value: 'creationDate',
            cellClass: 'body-2'
          },
          {
            text: 'Name',
            align: 'center',
            sortable: false,
            value: 'name',
          },
          {
            text: 'Governor id',
            align: 'center',
            sortable: false,
            value: 'governor',
          },
          {
            text: 'Coordinates id',
            align: 'center',
            sortable: false,
            value: 'coordinates',
          },
          {
            text: 'Climate',
            align: 'center',
            sortable: false,
            value: 'climate',
          },
          {
            text: 'Population',
            align: 'center',
            sortable: false,
            value: 'population',
          },
          {
            text: 'Population Density',
            align: 'center',
            sortable: false,
            value: 'populationDensity',
          },
          {
            text: 'Car code',
            align: 'center',
            sortable: false,
            value: 'carCode',
          },
          {
            text: 'Area',
            align: 'center',
            sortable: false,
            value: 'area',
          },
          {
            text: 'Meters Above Sea Level',
            align: 'center',
            sortable: false,
            value: 'metersAboveSeaLevel',
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

    methods: {
      // formatItem(item) {
      //   item = { ...item };
      //   this.$utils.numbers.mapNumberOrValueFields(item,
      //     ['area', 'governor', 'coordinates', 'population', 'populationDensity', 'carCode'])
      //   return item;
      // },

      createItem() {
        this.loadingCreate = true;
        let item = { ...this.item };
        // let item = this.formatItem(this.item);
        this.$api.city.post(item)
        .then( () => {
          this.updateKey += 1;
          this.creationDialog = false;
          this.$refs.form.reset();
        })
        .finally( () => {
          this.loadingCreate = false;
        })
      },

      saveEditable() {
        // let item = this.formatItem(this.editable);
        let item = { ...this.editable };
        if (!item.id) return;
        this.loadingEdit = true;
        this.$api.city.replace(item.id, item)
        .then( () => {
          this.updateKey += 1;
          this.editingDialog = false;
          this.$refs.formEdit.reset();
        })
        .finally( () => {
          this.loadingEdit = false;
        })
      },


      editItem(item) {
        this.editable = { ...item };
        this.editingDialog = true;
      },
    }
  }
</script>
