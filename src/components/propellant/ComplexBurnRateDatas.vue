<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
        <v-col >
            <v-col>
                <v-alert
                    type="info"
                    closable
                    variant="outlined">
                    <ul style="text-align: left">
                        <li>Pressure intervals must not overlap.</li>
                        <li>If combustion chamber encounters a value that is not covered by your data, the calculation will fail. </li>
                        <li>Provide upper and lower pressure bounds that encompass the pressure range encountered by your motor.</li>
                    </ul>
                </v-alert>
            </v-col>
            <v-col>
                <v-alert
                    :model-value="showError"
                    color="error"
                    icon="mdi-alert-box-outline"
                    variant="outlined">
                    Your burn rate data should not be empty or has incorrect values.
                </v-alert>
            </v-col>

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
                    size="small"
                    class="mr-2"
                    color="green"
                    @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon
                    size="small"
                    color="red"
                    @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        </v-col>
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
                { title: 'Pressure', value: 'fromPressureIncluded' },
                { title: 'Burn rate coeff.', value: 'burnRateCoefficient' },
                { title: 'Pressure exp.', value: 'pressureExponent' },
                { title: 'Actions', value: 'action', sortable: false }
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
