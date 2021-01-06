<template>
    <v-col>
        <v-alert
            :value="displayImportError"
            class="mt-5 ml-2 mr-2"
            colored-border
            border="left"
            elevation="2"
            type="warning"
            icon="mdi-alert-box-outline">
            {{errorMessage}}
        </v-alert>
        <v-btn small color="primary" @click="browseFile" :loading="importInProgress">
            <v-icon left>mdi-file-upload</v-icon>
            Import from file
        </v-btn>
        <input type="file" style="display: none;" ref="fileBrowser"
               id="avatar" name="avatar" @change="loadFile" accept="application/json">
    </v-col>
</template>

<script>

import {
    ajvValidator,
    convertFromVersion1ToVersion2, convertFromVersion2ToVersion3,
    validateImportVersion1,
    validateImportVersion2
} from '@/modules/importValidator'
import Axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import { extractIdFromHateoasResponse } from '@/modules/utils'
var deepEqual = require('deep-equal')

export default {
    name: 'ImportJsonMotor',
    data() {
        return {
            errorMessage: null,
            displayImportError: false,
            importInProgress: false
        }
    },
    computed: {
        ...mapGetters('customPropellants', ['customPropellants'])
    },
    methods: {
        browseFile() {
            this.$refs.fileBrowser.value = ''
            this.$refs.fileBrowser.click()
        },
        resetErrors() {
            this.errorMessage = null
            this.displayImportError = false
        },
        loadFile(event) {
            this.resetErrors()
            let file = event.target.files[0]
            if (file) {
                var reader = new FileReader()
                reader.readAsText(file, 'UTF-8')
                const me = this
                reader.onload = function(evt) {
                    try {
                        let loadedConfig = JSON.parse(evt.target.result)
                        me.loadFromJSON(loadedConfig, me)
                    } catch (e) {
                        console.error('import fail', ajvValidator.errors)
                        me.errorMessage = 'The file is not valid'
                        me.displayImportError = true
                    }
                }
                reader.onerror = function(evt) {
                    me.errorMessage = 'Can\'t read file'
                    me.displayImportError = true
                }
            }
        },
        loadFromJSON(loadedConfig, scope = this) {
            if (validateImportVersion2(loadedConfig) || validateImportVersion1(loadedConfig)) {
                convertFromVersion1ToVersion2(loadedConfig)
                const newMotor = convertFromVersion2ToVersion3(loadedConfig)
                this.$emit('importStart')
                if (newMotor.customPropellant) {
                    scope.savePropellantAndMotor(newMotor)
                } else {
                    scope.saveMotor(newMotor)
                }
                scope.importInProgress = true
                scope.displayImportError = false
            } else {
                scope.errorMessage = `Your file is invalid`
                scope.displayImportError = true
            }
        },
        savePropellantAndMotor(motorVersion3) {
            let propellantUnit = motorVersion3.customPropellant.unit
            delete motorVersion3.customPropellant.unit
            const propellantToImport = JSON.stringify(motorVersion3.customPropellant)
            let matchingPropellant = this.customPropellants.filter(propellant => {
                return deepEqual(JSON.parse(propellant.json), JSON.parse(propellantToImport))
            })

            if (matchingPropellant.length > 0) {
                motorVersion3.motor.propellantId = matchingPropellant[0].id
                this.saveMotor(motorVersion3)
            } else {
                Axios.post(`/propellants/`, {
                    unit: propellantUnit,
                    name: motorVersion3.customPropellant.name ? motorVersion3.customPropellant.name : `Propellant - ${this.getDateTimeAsString()}`,
                    json: propellantToImport
                })
                    .then((response) => {
                        motorVersion3.motor.propellantId = extractIdFromHateoasResponse(response)
                        this.loadCustomPropellants()
                        this.saveMotor(motorVersion3)
                    })
                    .catch((error) => {
                        if (error.response && error.response.status === 409) {
                            motorVersion3.customPropellant.name = `${motorVersion3.customPropellant.name} - ${this.getDateTimeAsString()}`
                            this.savePropellantAndMotor(motorVersion3)
                        } else {
                            console.error(error)
                            this.$emit('importStop')
                            this.importInProgress = false
                        }
                    })
            }
        },
        saveMotor(motorVersion3) {
            Axios.post(`/motors/`, {
                name: motorVersion3.name ? motorVersion3.name : `Motor - ${this.getDateTimeAsString()}`,
                json: JSON.stringify(motorVersion3.motor)
            })
                .then((response) => {
                    this.loadMotors()
                })
                .catch((error) => {
                    console.error(error)
                    if (error.response.status === 409) {
                        motorVersion3.name = `${motorVersion3.name} - ${this.getDateTimeAsString()}`
                        this.saveMotor(motorVersion3)
                    }
                })
                .finally(() => {
                    this.$emit('importStop')
                    this.importInProgress = false
                })
        },
        getDateTimeAsString() {
            return new Date().toLocaleString()
        },
        ...mapActions('motors', ['loadMotors']),
        ...mapActions('customPropellants', ['loadCustomPropellants'])
    }
}
</script>

<style scoped>

</style>
