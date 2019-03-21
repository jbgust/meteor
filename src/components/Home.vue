<template>
    <v-container fluid grid-list-md fill-height>
        <v-layout row wrap>
            <v-flex d-flex>
                <v-card>
                    <!--<v-card-title class="headline grey lighten-2"-->
                                  <!--primary-title>-->
                        <!--TODO : Home page-->
                    <!--</v-card-title>-->
                    <v-card-text>
                        <v-flex tag="h1" class="headline">
                            Build and design your own solid rocket motor
                        </v-flex>
                        <v-card flat>
                            <v-card-text>
                                Meteor is a modern and free application that helps you to design your motor.
                                <br> (for cylindrical grain configurations, such as BATES)
                            </v-card-text>
                        </v-card>
                        <v-card flat>
                            <v-card-text>
                                Why using it?
                                <ul>
                                    <li>
                                        It's free, why take a paid solution?
                                    </li>
                                    <li>
                                        Reliable results because it uses the same calculations model as the famous <a href="https://www.nakka-rocketry.net/softw.html#SRM" target="_blank">SRM Excel file</a>
                                    </li>
                                    <li>
                                        6 native propellants
                                    </li>
                                    <li>
                                        Easy to use
                                    </li>
                                    <li>
                                        Export and import your work
                                    </li>
                                    <li>
                                        Optimal nozzle design, by default Meteor compute the best nozzle expansion ratio
                                    </li>
                                    <li>
                                        Tweak the computation model with the advanced configuration
                                    </li>
                                </ul>
                            </v-card-text>
                        </v-card>
                        <v-card flat>
                            <v-card-text>
                                Meteor use <a href="https://github.com/jbgust/jsrm" target="_blank" a>JSRM library</a> as computation model.
                                JSRM is the Java implementation of SRM Excel file made By <a href="https://www.nakka-rocketry.net/author.html" target="_blank">Richard Nakka</a>.
                            </v-card-text>
                        </v-card>
                        <v-btn :to="'/demo'">View demo</v-btn>
                        <v-btn :to="'/motorDesign'">Try it!</v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'home'
}
</script>

<style scoped>

</style>
