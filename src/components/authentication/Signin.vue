<template>
    <v-form
        ref="form"
        v-model="valid"
    >
        <v-text-field
            v-model="email"
            label="E-mail"
            required
        ></v-text-field>
        <v-text-field
            v-model="password"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            required
        ></v-text-field>

        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="signin"
        >
            Sign in
        </v-btn>
    </v-form>
</template>

<script>
import Axios from 'axios'
import { saveToken } from '../../modules/authentication'

export default {
    name: 'Signin',
    data: () => ({
        valid: true,
        email: 'dev@meteor.fr',
        password: 'Tototiti!4',
        showPassword: false
    }),
    methods: {
        signin() {
            if (this.$refs.form.validate()) {
                const me = this
                Axios.post('/auth/signin', {}, { data: {
                    username: this.email,
                    password: this.password
                } })
                    .then(function(response) {
                        saveToken(response.data)
                        me.$router.push({ path: '/motorDesign' })
                    })
                    .catch(function(error) {
                        console.error(error)
                        alert('ERROR authentification')
                    })
            }
        }
    }
}
</script>

<style scoped>

</style>
