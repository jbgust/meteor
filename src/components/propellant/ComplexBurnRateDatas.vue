<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
        <v-layout column>
            <v-flex>
                <v-alert
                    type="info"
                    dismissible
                    outlined>
                    <ul>
                        <li>Pressure intervals must not overlap.</li>
                        <li>If combustion chamber encounters a value that is not covered by your data, the calculation will fail. </li>
                        <li>Provide upper and lower pressure bounds that encompass the pressure range encountered by your motor.</li>
                    </ul>
                </v-alert>
            </v-flex>
            <v-flex>
                <v-alert
                    :value="showError"
                    color="error"
                    icon="mdi-alert-box-outline"
                    outlined>
                    Your burn rate data should not be empty or has incorrect values.
                </v-alert>
            </v-flex>

        <burn-data-editor ref="dataEditor" :units="units" @created="addBurnRateData"></burn-data-editor>
        <v-data-table
            :headers="headers"
            :items="burnRateDatas"
            hide-default-footer
            no-data-text="No burn rate data"
            class="elevation-1">

            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-btn @click="openEditor" id="addBurRateDateBtn">
                        <v-icon>mdi-playlist-plus</v-icon>
                        add
                    </v-btn>
                </v-toolbar>
            </template>
            <template v-slot:item.fromPressureIncluded="{ item }">
                {{ `${item.fromPressureIncluded} to ${item.toPressureExcluded} ${units.pressureUnit}`}}
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        </v-layout>
</template>

<script>
import BurnDataEditor from './BurnDataEditor'
import { validateComplexBurnRateData } from '../../modules/customPropellant'
export default {
    name: 'ComplexBurnRateDatas',
    components: { BurnDataEditor },
    props: {
        units: Object
    },
    data() {
        return {
            headers: [
                { text: 'Pressure', value: 'fromPressureIncluded' },
                { text: 'Burn rate coeff.', value: 'burnRateCoefficient' },
                { text: 'Pressure exp.', value: 'pressureExponent' },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            burnRateDatas: [],
            showError: false
        }
    },
    methods: {
        openEditor() {
            this.$refs.dataEditor.add()
        },
        addBurnRateData(burnData) {
            this.burnRateDatas.push(burnData)
        },
        getBurnRateDataSet() {
            return this.burnRateDatas
        },
        editItem(item) {
            this.$refs.dataEditor.edit(item)
        },
        loadBurnRateDataSet(datas) {
            this.burnRateDatas = datas
        },
        deleteItem(item) {
            const index = this.burnRateDatas.indexOf(item)
            this.burnRateDatas.splice(index, 1)
        },
        validate() {
            this.showError = !validateComplexBurnRateData(this.burnRateDatas)
            return this.showError
        }
    }
}
</script>

<style scoped>

</style>
