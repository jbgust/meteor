<template>
    <v-row justify="center" align="center">
        <v-col shrink>
            <v-col>
                <div v-for="item in newsToDisplay" v-bind:key="item.id">
                    <div v-html="item.html" :class="newsClass(item.id)">
                    </div>
                </div>
            </v-col>
        </v-col>
    </v-row>
</template>
<script>
import { news } from '../../modules/news'
export default {
    name: 'news-content',
    props: {
        notReadNewsIds: null
    },
    data() {
        return {
            newsToDisplay: news.sort((a, b) => b.id - a.id)
        }
    },
    methods: {
        newsClass(newsId) {
            if (this.notReadNewsIds && this.notReadNewsIds.length > 0) {
                return this.notReadNewsIds.indexOf(newsId) >= 0
                    ? ['unreadNews'] : []
            }
            return []
        }
    }
}
</script>

<style>
    .unreadNews > ul > li {
        color: red;
    }
</style>
