<template>
    <b-container fluid>
      <b-row>
        <b-col lg="4">
          <solid-rocket-motor></solid-rocket-motor>
        </b-col>
        <b-col>
          <b-container>
            toto
          </b-container>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import SolidRocketMotor from './components/SolidRocketMotor'

Vue.use(BootstrapVue)

export default {
  name: 'app',
  components: { SolidRocketMotor }
}
</script>

<style lang="scss">

</style>
