<template>
    <v-dialog v-model="sheet" transition="dialog-bottom-transition" max-width="800">
        <v-card>
            <v-card-title
                class="headline purple"
                primary-title
                style="color: white"
            >
                Propellants
            </v-card-title>
            <v-card-text>
                <v-row justify="center" align="center">
                    <v-flex>
                        <v-col>
                            <v-alert type="error" v-model="showError" dismissible outlined>
                                {{ errorMessage }}
                            </v-alert>
                            <v-data-table
                                :headers="headers"
                                :items="customPropellants"
                                :items-per-page="10"
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
                                            <v-icon left>
                                                mdi-plus
                                            </v-icon>
                                            New propellant
                                        </v-btn>
                                    </v-toolbar>
                                </template>
                                <template v-slot:item.actions="{ item }">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn icon v-on="on" @click="editPropellant(item)" text>
                                                <v-icon color="green">mdi-pencil</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Edit</span>
                                    </v-tooltip>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn icon v-on="on" @click="confirmDelete(item)" text>
                                                <v-icon color="red">mdi-delete</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Delete</span>
                                    </v-tooltip>
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-flex>
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
                <v-card-title class="headline">
                    Delete "{{ propellantToDelete ? propellantToDelete.name : ''}}"
                </v-card-title>
                <v-card-text>Are you sure ?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        outlined
                        @click="cancelDelete"
                    >
                        No
                    </v-btn>
                    <v-btn
                        color="red darken-1"
                        outlined
                        @click="deleteItem"
                    >
                        Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <propellant-editor ref="propellantEditor" :units="units" @propellantCommit="loadCustomPropellants"/>
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
                { text: 'Name', value: 'name' },
                { text: 'Description', value: 'description' },
                { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
            ],
            confirmDialog: false,
            propellantToDelete: null,
            errorMessage: null,
            showError: false,
            sheet: false,
            on: null,
            shortLabel: shortLabel
        }
    },
    watch: {
        sheet(newValue, oldValue) {
            if (newValue && !oldValue) {
                this.loadCustomPropellants(this.displayError)
            }
        }
    },
    methods: {
        ...mapActions('customPropellants', ['loadCustomPropellants', 'deletePropellant']),
        show() {
            this.sheet = true
            this.errorMessage = null
            this.showError = false
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
            this.deletePropellant({ propellant: this.propellantToDelete, showError: this.displayError })
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
