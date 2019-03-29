<template>
        <v-layout row>
            <v-flex>
                <div class="meteor-container block1">
                    <h1>
                        Build and design your own solid rocket motor
                    </h1>
                    <h3>
                        Meteor is a modern and free application that helps you to design your motor
                    </h3>
                    <div style="display: flex; width: 100%;justify-content: center;">
                        <div>
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
                                <li>
                                    TODO : ça dimensionne les tuyères (choix des angles, dimensions, ...)
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div style="text-align: center">
                        <v-btn :to="'/demo'">View demo</v-btn>
                        <v-btn :to="'/motorDesign'">Try it!</v-btn>
                    </div>
                </div>

                <div class="meteor-container">
                    <h1 align="center">
                        Next features
                    </h1>
                    <div style="display: flex; width: 100%;justify-content: center;">
                        <div>
                            todo
                        </div>
                    </div>
                </div>

                <div class="meteor-container">
                    <div style="display: flex; width: 100%;justify-content: center;">
                        <div>
                            Meteor use <a href="https://github.com/jbgust/jsrm" target="_blank" a>JSRM library</a> as computation model.
                            It works solely for cylindrical grain configurations, such as BATES.
                            JSRM is the Java implementation of SRM Excel file made By <a href="https://www.nakka-rocketry.net/author.html" target="_blank">Richard Nakka</a>.
                        </div>
                    </div>
                </div>
            </v-flex>
        </v-layout>
</template>

<script>
export default {
    name: 'home'
}
</script>

<style>
.meteor-container {
    height: 400px;
}
.meteor-container h1{
    text-align: center;
    padding: 40px 0 0 0;
    color: black;
}
.meteor-container h3 {
    text-align: center;
    color: black;
}
.meteor-container > div {
    margin: 10px 0 10px 0;
}
    .block1{
        width: 100wh;
        color: #fff;
        background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
        background-size: 400% 400%;
        -webkit-animation: Gradient 15s ease infinite;
        -moz-animation: Gradient 15s ease infinite;
        animation: Gradient 15s ease infinite;
    }

@-webkit-keyframes Gradient {
    0% {
        background-position: 0% 50%
    }
    50% {
        background-position: 100% 50%
    }
    100% {
        background-position: 0% 50%
    }
}

@-moz-keyframes Gradient {
    0% {
        background-position: 0% 50%
    }
    50% {
        background-position: 100% 50%
    }
    100% {
        background-position: 0% 50%
    }
}

@keyframes Gradient {
    0% {
        background-position: 0% 50%
    }
    50% {
        background-position: 100% 50%
    }
    100% {
        background-position: 0% 50%
    }
}
</style>
