<template>
    <v-layout row justify-center>
        <v-dialog scrollable v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title
                    class="headline grey lighten-2"
                    primary-title>
                    Burn data editor
                </v-card-title>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex d-flex>
                            <div style="padding: 10px;">
                                <v-text-field id="startPressure" label="From pressure:" v-model="burnData.fromPressureIncluded" :suffix="units.pressureUnit"/>
                                <v-text-field id="endPressure" label="To pressure:" v-model="burnData.toPressureExcluded" :suffix="units.pressureUnit"/>
                                <v-text-field id="burnRateCoeff" label="Burn rate coefficient:" v-model="burnData.burnRateCoefficient" :hint="hintBurnRate" persistent-hint/>
                                <v-text-field id="pressureExponent" label="Pressure exponent:" v-model="burnData.pressureExponent" :hint="hintBurnRate" persistent-hint/>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="cancel">Cancel</v-btn>
                    <v-btn color="primary" @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    name: 'BurnDataEditor',
    data() {
        return {
            dialog: false,
            burnData: {},
            hintBurnRate: 'Value is different between SI and Imperial',
            createMode: false
        }
    },
    props: {
        units: Object
    },
    methods: {
        show() {
            this.dialog = true
        },
        add() {
            this.createMode = true
            this.burnData = {}
            this.show()
        },
        edit(item) {
            this.createMode = false
            this.burnData = item
            this.show()
        },
        save() {
            if (this.createMode) {
                this.$emit('created', this.burnData)
            }
            this.dialog = false
        },
        cancel() {
            this.burnData = {}
            this.dialog = false
        }
    }
}
</script>

<style scoped>

</style>
