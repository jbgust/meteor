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
        <v-text-field
            v-model="passwordConfirm"
            label="Confirm password"
            :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword2 ? 'text' : 'password'"
            @click:append="showPassword2 = !showPassword2"
            required
        ></v-text-field>

        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="signup"
        >
            Create account
        </v-btn>
    </v-form>
</template>

<script>
import Axios from 'axios'

export default {
    name: 'Signup',
    data: () => ({
        valid: true,
        email: null,
        password: null,
        passwordConfirm: null,
        showPassword: false,
        showPassword2: false
    }),
    methods: {
        signup() {
            if (this.$refs.form.validate() && this.password === this.passwordConfirm) {
                const me = this
                Axios.post('/auth/signup', {}, { data: {
                    email: this.email,
                    password: this.password
                } })
                    .then(function(response) {
                        localStorage.setItem('token', response.data.accessToken)
                        me.$router.push({ name: 'Home' })
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
