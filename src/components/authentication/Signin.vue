<template>
    <v-container>
        <v-layout column align-center>
            <v-flex xs10 sm6>
                <v-icon size="80">mdi-rocket</v-icon>
            </v-flex>
            <v-flex xs10 sm6 >
            <h1>
                Sign in to METEOR
            </h1>
            </v-flex>
            <v-flex grow>
                <v-alert
                    v-if="showError"
                    border="top"
                    colored-border
                    type="error"
                    elevation="2"
                    max-width="400"
                >
                    Authentication failed
                </v-alert>
                <v-card>
                    <v-card-text class="mt-5">
                        <v-form
                            ref="form"
                            v-model="valid"
                        >
                            <v-text-field
                                v-model="email"
                                label="E-mail"
                                :rules="emailRules"
                                required
                            ></v-text-field>
                            <v-text-field
                                sty
                                v-model="password"
                                label="Password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                :rules="passwordRules"
                                @click:append="showPassword = !showPassword"
                                required
                            ></v-text-field>
                            <router-link :to="'/lost-password'">Forgot password?</router-link>
                            <v-btn width="100%"
                                   style="margin-top: 20px"
                                :disabled="!valid"
                                color="success"
                                @click="signin"
                               :loading="loading"
                            >
                                Sign in
                            </v-btn>

                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
                <v-card>
                    <v-card-text class="text--primary">
                        New to METEOR? <v-btn color="blue" :to="'/signup'" text>Create an acount.</v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Axios from 'axios'
import { saveToken } from '../../modules/authentication'
import { emailRule, passwordRule } from '../../modules/formValidationRules'

export default {
    name: 'Signin',
    data: () => ({
        valid: true,
        email: 'dev@meteor.fr',
        password: 'Tototiti!4',
        showPassword: false,
        showError: false,
        emailRules: emailRule(),
        passwordRules: passwordRule(),
        loading: false
    }),
    methods: {
        signin() {
            if (this.$refs.form.validate()) {
                const me = this
                me.showError = false
                me.loading = true
                Axios.post('/auth/signin', {}, { data: {
                    username: this.email,
                    password: this.password
                } })
                    .then(function(response) {
                        saveToken(response.data)
                        me.$router.push({ path: '/motorDesign' })
                        me.loading = false
                    })
                    .catch(() => {
                        me.email = ''
                        me.password = ''
                        me.showError = true
                        me.loading = false
                    })
            }
        }
    }
}
</script>

<style scoped>

</style>
