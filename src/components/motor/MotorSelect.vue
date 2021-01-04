<template>
    <v-dialog v-model="sheet" transition="dialog-bottom-transition" max-width="500">
        <template v-slot:activator="{ on }">
            <v-btn
                icon
                text
                v-on="on"
            >
                <v-icon left size="25">mdi-database-arrow-down</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title
                class="headline purple"
                primary-title
                style="color: white"
            >
                Rocket motors
            </v-card-title>
            <v-card-text>
                <v-row justify="center" align="center">
                    <v-flex shrink>
                        <v-col>
                            <v-alert type="error" v-model="showError" dismissible outlined>
                                {{ errorMessage }}
                            </v-alert>
                            <v-data-table
                                :headers="headers"
                                :items="motors"
                                :items-per-page="10"
                                class="elevation-1"
                            >
                                <template v-slot:item.actions="{ item }">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn icon v-on="on" @click="loadMotor(item)" text>
                                                <v-icon color="green">mdi-play</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Run computation</span>
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
                <import-json-motor></import-json-motor>
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
                    Delete "{{ motorToDelete ? motorToDelete.name : ''}}"
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
    </v-dialog>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import ImportJsonMotor from '@/components/motor/ImportJsonMotor'

export default {
    name: 'MotorSelect',
    components: { ImportJsonMotor },
    data() {
        return {
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Description', value: 'description' },
                { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
            ],
            confirmDialog: false,
            motorToDelete: null,
            errorMessage: null,
            showError: false,
            sheet: false,
            on: null
        }
    },
    watch: {
        sheet(newValue, oldValue) {
            if (newValue && !oldValue) {
                this.errorMessage = null
                this.showError = false
                this.loadMotors(this.displayError)
            }
        }
    },
    methods: {
        ...mapActions('motors', ['loadMotors', 'deleteMotor']),
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
            this.deleteMotor({ motor: this.motorToDelete, showError: this.displayError })
            this.confirmDialog = false
        },
        cancelDelete() {
            this.confirmDialog = false
        },
        loadMotor(motor) {
            let motorJson = JSON.parse(motor.json)
            motorJson.id = motor.id
            motorJson.name = motor.name
            motorJson.description = motor.description
            this.$emit('loadMotor', motorJson)
            this.sheet = false
        }
    },
    computed: {
        ...mapGetters('motors', ['motors'])
    }
}
</script>

<style scoped>

</style>
