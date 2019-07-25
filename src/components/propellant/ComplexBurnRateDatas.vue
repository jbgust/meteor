<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-btn @click="openEditor">
            <v-icon>playlist_add</v-icon>
            add
        </v-btn>
        <burn-data-editor ref="dataEditor" :units="units" @created="addBurnRateData"></burn-data-editor>

        <v-data-table
            :headers="headers"
            :items="burnRateDatas"
            hide-actions
            class="elevation-1">
            <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                                              <span v-on="on">
                                                {{ props.header.text }}
                                              </span>
                    </template>
                    <span>
                                              {{ props.header.text }}
                                            </span>
                </v-tooltip>
            </template>
            <template v-slot:items="props">
                <td>{{ props.item.fromPressureIncluded}}</td>
                <td>{{ props.item.toPressureExcluded}}</td>
                <td>{{ props.item.burnRateCoefficient}}</td>
                <td>{{ props.item.pressureExponent}}</td>
                <td class="justify-center layout px-0">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(props.item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(props.item)"
                    >
                        delete
                    </v-icon>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import BurnDataEditor from './BurnDataEditor'
export default {
    name: 'ComplexBurnRateDatas',
    components: { BurnDataEditor },
    props: {
        units: Object
    },
    data() {
        return {
            headers: [
                { text: 'From pressure', value: 'fromPressureIncluded' },
                { text: 'To pressure', value: 'toPressureExcluded' },
                { text: 'Burn rate coeff.', value: 'burnRateCoefficient' },
                { text: 'Pressure exp.', value: 'pressureExponent' },
                { text: 'Actions', value: 'name', sortable: false }
            ],
            burnRateDatas: [
                {
                    burnRateCoefficient: '8.26',
                    pressureExponent: '0.319',
                    fromPressureIncluded: '0',
                    toPressureExcluded: '9999999999'
                }
            ]
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

        deleteItem(item) {
            const index = this.burnRateDatas.indexOf(item)
            this.burnRateDatas.splice(index, 1)
        }
    }
}
</script>

<style scoped>

</style>
