<template>
    <b-form-group :label="label">
        <b-form-input :id="id" v-bind:value.sync="value" v-on:input="notifyChange" required type="number"/>
    </b-form-group>
</template>

<script>
export default {
    name: 'decimal-input',
    props: {
        id: null,
        label: null,
        value: null
    },
    methods: {
        notifyChange(newValue) {
            this.$emit('input', newValue)
        }
    }
}
</script>

<style scoped>

</style>
