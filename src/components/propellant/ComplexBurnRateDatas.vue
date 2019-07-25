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
            no-data-text="No burn rate data"
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
                <td>{{ `[ ${props.item.fromPressureIncluded} to ${props.item.toPressureExcluded} [ ${units.pressureUnit}`}}</td>
                <td>{{ props.item.burnRateCoefficient}}</td>
                <td>{{ props.item.pressureExponent}}</td>
                <td>
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
                { text: 'Pressure', value: 'fromPressureIncluded' },
                { text: 'Burn rate coeff.', value: 'burnRateCoefficient' },
                { text: 'Pressure exp.', value: 'pressureExponent' },
                { text: 'Actions', value: 'name', sortable: false }
            ],
            burnRateDatas: []
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
        }
    }
}
</script>

<style scoped>

</style>
