<template>
    <v-container fluid align="center">
            <v-col grow xs="10" sm="6" lg="3">
                <v-card>
                    <v-card-title>
                        <v-icon size="80">mdi-rocket</v-icon>
                        <h2>
                            Sign in to METEOR
                        </h2>
                    </v-card-title>
                    <v-card-text class="mt-5">
                        <v-alert
                            v-if="showError"
                            border="start"
                            border-color="top"
                            variant="outlined"
                            type="error"
                            class="mb-5"
                        >
                            Authentication failed
                        </v-alert>
                        <v-form
                            ref="form"
                            v-model="valid"
                        >
                            <v-text-field
                                id="signinEmail"
                                v-model="email"
                                label="E-mail"
                                :rules="emailRules"
                                required
                            ></v-text-field>
                            <v-text-field
                                sty
                                id="signinPassword"
                                v-model="password"
                                label="Password"
                                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                :rules="passwordRules"
                                @click:append-inner="showPassword = !showPassword"
                                required
                            ></v-text-field>
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
                        <router-link to="/signup">Create an account</router-link>
                        <v-spacer></v-spacer>
                        <router-link :to="'/lost-password'">Forgot password?</router-link>
                    </v-card-actions>
                </v-card>
            </v-col>
    </v-container>
</template>

<script>
import Axios from 'axios'
import { emailRule, passwordRule } from '../../modules/formValidationRules'
import { mapActions } from 'vuex'

export default {
    name: 'Signin',
    data: () => ({
        valid: true,
        email: null,
        password: null,
        showPassword: false,
        showError: false,
        emailRules: emailRule(),
        passwordRules: passwordRule(),
        loading: false
    }),
    mounted() {
        window.addEventListener('keyup', this.keyEventCatcher)
    },
    methods: {
        keyEventCatcher(event) {
            if (event && event.keyCode === 13 && this.valid) {
                this.signin()
            }
        },
        signin() {
            if (this.$refs.form) {
                this.$refs.form.validate().then(() => {
                    const me = this
                    me.showError = false
                    me.loading = true
                    Axios.post('/auth/signin', {
                        username: this.email,
                        password: this.password
                    })
                        .then(function(response) {
                            me.saveToken(response.data)
                            me.$router.push({ path: '/motorDesign' })
                            me.loading = false
                        })
                        .catch((error) => {
                            me.password = ''
                            me.showError = true
                            me.loading = false
                            console.error(error)
                        })
                })
            }
        },
        ...mapActions('authentication', ['saveToken'])
    }
}
</script>

<style scoped>

</style>
