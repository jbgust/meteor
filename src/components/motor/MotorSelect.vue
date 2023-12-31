<template>
    <v-dialog v-model="sheet" transition="dialog-bottom-transition" max-width="800">
        <v-card>
            <v-card-title
                class="text-h5 bg-purple"
                primary-title
                style="color: white"
            >
                Rocket motors
            </v-card-title>
            <v-card-text>
                <v-row justify="center" align="center">
                            <v-alert type="error" v-model="showError" closable variant="outlined">
                                {{ errorMessage }}
                            </v-alert>
                            <v-data-table
                                :headers="headers"
                                :items="motors"
                                :items-per-page="10"
                                :loading="loading"
                                density="compact"
                            >
                                <template v-slot:item.name="{ item }">
                                    {{ shortLabel(item.name) }}
                                </template>
                                <template v-slot:item.description="{ item }">
                                    {{ shortLabel(item.description, 150) }}
                                </template>
                                <template v-slot:item.actions="{ item }">
                                    <v-tooltip location="bottom">
                                        <template v-slot:activator="{ props }">
                                            <v-btn icon="mdi-play" v-bind="props" color="green"  @click="loadMotor(item)" variant="text">
                                            </v-btn>
                                        </template>
                                        <span>Run computation</span>
                                    </v-tooltip>
                                    <v-tooltip location="bottom">
                                        <template v-slot:activator="{ props }">
                                            <v-btn icon="mdi-delete" v-bind="props" color="red" @click="confirmDelete(item)" variant="text">
                                            </v-btn>
                                        </template>
                                        <span>Delete</span>
                                    </v-tooltip>
                                </template>
                            </v-data-table>
                        </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="sheet = false">
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
                    Delete "{{ motorToDelete ? motorToDelete.name : ''}}"
                </v-card-title>
                <v-card-text>Are you sure ?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        variant="outlined"
                        @click="cancelDelete"
                    >
                        No
                    </v-btn>
                    <v-btn
                        color="red-darken-1"
                        variant="outlined"
                        @click="deleteItem"
                    >
                        Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-dialog>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { shortLabel } from '@/modules/utils'
import { isCustomPropellant } from '@/modules/customPropellant'

export default {
    name: 'MotorSelect',
    data() {
        return {
            headers: [
                { title: 'Name', value: 'name' },
                { title: 'Description', value: 'description' },
                { title: 'Actions', value: 'actions', sortable: false, align: 'center' }
            ],
            loading: false,
            confirmDialog: false,
            motorToDelete: null,
            errorMessage: null,
            showError: false,
            sheet: false,
            on: null,
            shortLabel: shortLabel,
            customPropellantIds: []
        }
    },
    watch: {
        sheet(newValue, oldValue) {
            if (newValue && !oldValue) {
                if (this.$refs.importimportForm) {
                    this.$refs.importForm.resetValidation()
                }
                this.errorMessage = null
                this.showError = false
                this.loadMotors(this.displayError)
            }
        },
        motors() {
            this.loading = false
        },
        customPropellants(newValue) {
            this.customPropellantIds = newValue.map(propellant => propellant.id)
        }
    },
    methods: {
        ...mapActions('motors', ['loadMotors', 'deleteMotor']),
        show() {
            this.sheet = true
        },
        confirmDelete(item) {
            this.motorToDelete = null
            this.motorToDelete = item
            this.confirmDialog = true
        },
        displayError(message) {
            this.errorMessage = message
            this.showError = true
        },
        deleteItem() {
            this.loading = true
            this.deleteMotor({ motor: this.motorToDelete, showError: this.displayError })
            this.confirmDialog = false
        },
        cancelDelete() {
            this.confirmDialog = false
        },
        loadMotor(motor) {
            let motorJson = JSON.parse(motor.json)
            let missingPropellant = false
            motorJson.id = motor.id
            motorJson.name = motor.name
            motorJson.description = motor.description

            // remove custom propellant if no more exists
            if (isCustomPropellant(motorJson.propellantId) && !this.customPropellantIds.includes(motorJson.propellantId)) {
                missingPropellant = true
                motorJson.propellantId = null
            }
            this.$emit('loadMotor', motorJson, missingPropellant)
            this.sheet = false
        }
    },
    computed: {
        ...mapGetters('motors', ['motors']),
        ...mapGetters('customPropellants', ['customPropellants'])
    }
}
</script>

<style scoped>

</style>
