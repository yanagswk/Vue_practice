<template>
    <div>
        <header>My Trello</header>
        <main>
            <p class="info-line">All: {{ totalCardCount }} task</p>
            <draggable :list="lists"
                       @end="movingList"
                       class="list-index">
                <List v-for="(item, index) in lists"
                      :key="item.id"
                      :title="item.title"
                      :titleMemo="item.titleMemo"
                      :cards="item.cards"
                      :listIndex="index"
                      @change="movingCard"
                />
            <ListAdd />
            </draggable>
        </main>
    </div>
</template>



<script>
import draggable from 'vuedraggable'
import ListAdd from './ListAdd.vue'
import List from './List.vue'
import { mapState } from 'vuex'

export default {
    components: {
        draggable,
        ListAdd,
        List,
    },
    computed: {
        ...mapState([
            'lists',
            'hourList',
        ]),
        totalCardCount() {
            return this.$store.getters.totalCardCount
        }
    },
    methods: {
        movingCard() {
            this.$store.dispatch('updateList', { lists: this.lists })
        },
        movingList() {
            this.$store.dispatch('updateList', { lists: this.lists })
        }
    }
}
</script>