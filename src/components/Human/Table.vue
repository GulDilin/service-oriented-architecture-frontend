<template>
  <div>
    <AppItemsTable
      :headers="headers"
      :sortableHeaders="[ 'id', 'birthday' ]"
      :filterableHeaders="[ 'id', 'birthday' ]"
      api-name="human"
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
          Create Human
        </v-card-title>
        <human-form
          ref="form"
          :birthday.sync="item.birthday"
        ></human-form>
        <v-card-actions class="pb-4">
          <v-btn color="secondary" @click="creationDialog = false">Cancel</v-btn>
          <v-btn
            :loading="loadingCreate"
            color="primary"
            @click="createItem()"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="editingDialog"
      max-width="600"
    >
      <v-card max-width="600">
        <v-card-title>
          Edit Human with id {{ editable.id }}
        </v-card-title>
        <human-form
          ref="formEdit"
          :birthday.sync="editable.birthday"
        ></human-form>
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
  import HumanForm from './Form';

  export default {
    name: 'HumanTable',

    components: {
      AppItemsTable,
      HumanForm,
    },

    data() {
      return {
        item: {
          birthday: null,
        },
        creationDialog: false,
        editingDialog: false,
        loadingEdit: false,
        loadingCreate: false,
        updateKey: 1,

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

    methods: {
      createItem() {
        this.loadingCreate = true;
        let item = { ...this.item };
        this.$api.human.post(item)
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
        this.$api.human.replace(item.id, item)
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
    },
  }
</script>
