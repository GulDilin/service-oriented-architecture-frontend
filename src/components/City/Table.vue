<template>
  <div>
    <AppItemsTable
      :headers="headers"
      api-name="city"
      @click:add="creationDialog = true"
      :update-key="updateKey"
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
        loadingCreate: false,
        updateKey: 1,

        item: {
          name: undefined,
          governor: undefined,
          coordinates: undefined,
          climate: undefined,
          area: undefined,
          population: undefined,
          metersAboveSeaLevel: undefined,
          populationDensity: undefined,
          carCode: undefined,
        }
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
      createItem() {
        this.loadingCreate = true;
        this.$api.city.post(this.item)
        .then( () => {
          this.updateKey = 1;
          this.creationDialog = false;
          this.$refs.form.reset();
        })
        .finally( () => {
          this.loadingCreate = false;
        })
      }
    }
  }
</script>
