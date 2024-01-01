<template>
    <v-dialog v-model="sheet" transition="dialog-bottom-transition" max-width="800">
        <v-card>
            <v-card-title
                class="text-h5 bg-purple"
                primary-title
                style="color: white"
            >
                Propellants
            </v-card-title>
            <v-card-text>
                <v-row justify="center" align="center">
                    <v-col>
                        <v-col>
                            <v-alert type="error" v-model="showError" closable variant="outlined">
                                {{ errorMessage }}
                            </v-alert>
                            <v-data-table
                                :headers="headers"
                                :items="customPropellants"
                                :items-per-page="10"
                                :loading="loading"
                                class="elevation-1"
                            >
                                <template v-slot:item.name="{ item }">
                                    {{ shortLabel(item.name) }}
                                </template>
                                <template v-slot:item.description="{ item }">
                                    {{ shortLabel(item.description, 150) }}
                                </template>
                                <template v-slot:top>
                                    <v-toolbar
                                        flat
                                    >
                                        <v-btn id="btnAddPropellant" @click="addPropellant">
                                            <v-icon start>
                                                mdi-plus
                                            </v-icon>
                                            New propellant
                                        </v-btn>
                                    </v-toolbar>
                                </template>
                                <template v-slot:item.actions="{ item }">
                                    <v-tooltip location="bottom">
                                        <template v-slot:activator="{ props }">
                                            <v-btn icon="mdi-pencil" v-bind="props" @click="editPropellant(item)" variant="text" color="green">
                                            </v-btn>
                                        </template>
                                        <span>Edit</span>
                                    </v-tooltip>
                                    <v-tooltip location="bottom">
                                        <template v-slot:activator="{ props }">
                                            <v-btn icon="mdi-delete" color="red" v-bind="props" @click="confirmDelete(item)" variant="text">
                                            </v-btn>
                                        </template>
                                        <span>Delete</span>
                                    </v-tooltip>
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    @click="sheet = false"
                >
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog
            v-model="confirmDialog"
            persistent
            max-width="400"
        >
            <v-card>
                <v-card-title class="text-h5">
                    Delete "{{ propellantToDelete ? propellantToDelete.name : ''}}"
                </v-card-title>
                <v-card-text>If motors use this propellant, you will have to choose another one to use them. Do you really want to delete it?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        variant="outlined"
                        @click="cancelDelete"
                    >No
                    </v-btn>
                    <v-btn
                        color="red-darken-1"
                        variant="outlined"
                        @click="deleteItem"
                    >Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <propellant-editor ref="propellantEditor" :units="units" @propellantCommit="commitPropellant"/>
    </v-dialog>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import PropellantEditor from '@/components/propellant/PropellantEditor'
import { shortLabel } from '@/modules/utils'

export default {
    name: 'PropellantSelect',
    components: { PropellantEditor },
    props: {
        units: Object
    },
    data() {
        return {
            headers: [
                { title: 'Name', value: 'name' },
                { title: 'Description', value: 'description' },
                { title: 'Actions', value: 'actions', sortable: false, align: 'center' }
            ],
            confirmDialog: false,
            propellantToDelete: null,
            errorMessage: null,
            showError: false,
            sheet: false,
            on: null,
            loading: false,
            shortLabel: shortLabel
        }
    },
    watch: {
        sheet(newValue, oldValue) {
            if (newValue && !oldValue) {
                this.loadCustomPropellants(this.displayError)
            }
        },
        customPropellants() {
            this.loading = false
        }
    },
    methods: {
        ...mapActions('customPropellants', ['loadCustomPropellants', 'deletePropellant']),
        show() {
            this.loading = false
            this.sheet = true
            this.errorMessage = null
            this.showError = false
        },
        commitPropellant() {
            this.loading = true
            this.loadCustomPropellants()
        },
        confirmDelete(item) {
            this.propellantToDelete = null
            this.propellantToDelete = item
            this.confirmDialog = true
        },
        displayError(message) {
            this.errorMessage = message
            this.showError = true
        },
        deleteItem() {
            this.loading = true
            this.deletePropellant({
                propellant: this.propellantToDelete,
                showError: this.displayError,
                successCallback: () => this.$emit('propellantDeleted', this.propellantToDelete.id) })
            this.confirmDialog = false
        },
        cancelDelete() {
            this.confirmDialog = false
        },
        editPropellant(propellant) {
            let customPropellant = JSON.parse(propellant.json)
            customPropellant.id = propellant.id
            customPropellant.unit = propellant.unit
            customPropellant.name = propellant.name
            customPropellant.description = propellant.description
            this.$refs.propellantEditor.show(customPropellant)
        },
        addPropellant() {
            this.$refs.propellantEditor.show()
        }
    },
    computed: {
        ...mapGetters('customPropellants', ['customPropellants'])
    }
}
</script>

<style scoped>

</style>
