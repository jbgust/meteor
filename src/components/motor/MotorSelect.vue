<template>
    <v-dialog v-model="sheet" fullscreen hide-overlay transition="dialog-bottom-transition">
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
                Support Meteor with donation
            </v-card-title>
            <v-card-text>
                <v-row justify="center" align="center">
                    <v-flex shrink>
                        <v-col>
                            <v-data-table
                                :headers="headers"
                                :items="motors"
                                :items-per-page="10"
                                class="elevation-1"
                            >
                                <template v-slot:item.actions="{ item }">
                                    <v-icon
                                        small
                                        class="mr-2"
                                        @click="loadMotor(item)"
                                    >
                                        mdi-play
                                    </v-icon>
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
                    outlined
                    @click="sheet = false"
                >
                    Later
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'MotorSelect',
    data() {
        return {
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Description', value: 'description' },
                { text: 'Actions', value: 'actions', sortable: false }
            ],
            sheet: false,
            on: null
        }
    },
    watch: {
        sheet(newValue, oldValue) {
            if (newValue && !oldValue) {
                this.loadMotors()
            }
        }
    },
    methods: {
        ...mapActions('motors', ['loadMotors']),
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
