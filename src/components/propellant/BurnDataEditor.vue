<template>
    <v-layout row justify-center>
        <v-dialog scrollable v-model="dialog" persistent max-width="350px">
            <v-card>
                <v-card-title
                    class="headline grey lighten-2"
                    primary-title>
                    Burn data editor
                </v-card-title>
                <v-card-text>
                    <v-layout row wrap>
                        <v-col>
                                <v-form ref="burnRateEditorForm" class="mr-5 ml-5">
                                    <v-text-field id="startPressureInput" label="From pressure (included):" v-model="burnData.fromPressureIncluded" :suffix="units.pressureUnit" :rules="numberRule"/>
                                    <v-text-field id="endPressureInput" label="To pressure (excluded):" v-model="burnData.toPressureExcluded" :suffix="units.pressureUnit" :rules="numberRule" :error-messages="endPressureErrorMessage"/>
                                    <v-text-field id="burnRateCoeffInput" label="Burn rate coefficient:" v-model="burnData.burnRateCoefficient" :hint="hintBurnRate" persistent-hint :rules="numberRule"/>
                                    <v-text-field id="pressureExponentInput" label="Pressure exponent:" v-model="burnData.pressureExponent" :hint="hintBurnRate" persistent-hint :rules="numberRule"/>
                                </v-form>

                        </v-col>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="cancel">Cancel</v-btn>
                    <v-btn color="primary" @click="save" id="saveBurnRateDataBtn">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { numberRule } from '../../modules/formValidationRules'
import { nextTick } from 'vue'
export default {
    name: 'BurnDataEditor',
    data() {
        return {
            dialog: false,
            burnData: {},
            hintBurnRate: 'Value is different between SI and Imperial',
            createMode: false,
            numberRule: numberRule()
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
            nextTick(() => this.$refs.burnRateEditorForm.reset())
        },
        edit(item) {
            this.createMode = false
            this.burnData = item
            this.show()
        },
        save() {
            if (this.isFormValid()) {
                if (this.createMode) {
                    this.$emit('created', this.burnData)
                }
                this.dialog = false
            }
        },
        isFormValid() {
            return this.$refs.burnRateEditorForm ? this.$refs.burnRateEditorForm.validate() : true
        },
        cancel() {
            this.burnData = {}
            this.dialog = false
        }
    },
    computed: {
        endPressureErrorMessage() {
            let errors = []
            if (this.burnData && this.burnData.toPressureExcluded && this.burnData.fromPressureIncluded &&
                parseFloat(this.burnData.fromPressureIncluded) >= parseFloat(this.burnData.toPressureExcluded)) {
                errors.push('\'To pressure\' should be greater than \'From pressure\'')
            }
            return errors
        }
    }
}
</script>

<style scoped>

</style>
