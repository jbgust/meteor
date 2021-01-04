<template>
    <div>
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
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="browseFile" text :loading="importInProgress">
                    <v-icon>mdi-file-upload</v-icon>
                </v-btn>
            </template>
            <span>Load your project</span>
        </v-tooltip>
        <input type="file" style="display: none;" ref="fileBrowser"
               id="avatar" name="avatar" @change="loadFile" accept="application/json">
    </div>
</template>

<script>

import {
    ajvValidator,
    convertFromVersion1ToVersion2, convertFromVersion2ToVersion3,
    validateImportVersion1,
    validateImportVersion2
} from '@/modules/importValidator'
import Axios from 'axios'
import { mapActions } from 'vuex'

export default {
    name: 'ImportJsonMotor',
    data() {
        return {
            errorMessage: null,
            displayImportError: false,
            importInProgress: false
        }
    },
    methods: {
        browseFile() {
            this.$refs.fileBrowser.value = ''
            this.$refs.fileBrowser.click()
        },
        loadFile(event) {
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

                if (newMotor.customPropellant) {
                    scope.savePropellantAndMotor(newMotor)
                } else {
                    scope.saveMotor(newMotor)
                }
                scope.importInProgress = true
                scope.displayImportError = false
            } else {
                scope.errorMessage = `Your motor "${loadedConfig.name}" is invalid`
                scope.displayImportError = true
            }
        },
        savePropellantAndMotor(motorVersion3) {
            Axios.post(`/propellants/`, motorVersion3.customPropellant)
                .then((response) => {
                    const self = response.data._links.self
                    const newPropellantId = self.substring(self.lastIndexOf('/'), self.length)
                    motorVersion3.customPropellant = newPropellantId
                    this.saveMotor(motorVersion3)
                })
                .catch(function(error) {
                    console.error(error)
                    if (error.response.status === 409) {
                        console.warn('name duplication')
                        this.importInProgress = false
                    }
                })
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
                .finally(() => { this.importInProgress = false })
        },
        getDateTimeAsString() {
            return new Date().toLocaleString()
        },
        ...mapActions('motors', ['loadMotors'])
    }
}
</script>

<style scoped>

</style>
