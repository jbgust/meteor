<template>
    <b-container>
      <solid-rocket-motor></solid-rocket-motor>
    </b-container>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import SolidRocketMotor from './components/SolidRocketMotor'

Vue.use(BootstrapVue)

Vue.use(BootstrapVue)

export default {
  name: 'app',
  components: { SolidRocketMotor }
}
</script>

<style lang="scss">

</style>
