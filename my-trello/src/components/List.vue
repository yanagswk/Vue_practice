<template>
    <div class="list">
        <div class="lisheader">
            <p class="list-title">{{ title }}</p>
            <p class="list-title-memo">{{ titleMemo }}</p>
            <p class="deletelist">total: {{totalCardInList}}</p>
            <div class="deletelist" @click="removeList">✖︎</div>
        </div>
        <draggable group="cards"
                   :list="cards"
                   @end="$emit('change')">
            <Card v-for="(item, index) in cards"
                :body="item.body"
                :hour="item.hour"
                :key="item.id"
                :cardIndex="index"
                :listIndex="listIndex"
            />
            <CardAdd :listIndex="listIndex" />
        </draggable>
    </div>
</template>


<script>
import draggable from 'vuedraggable'
import CardAdd from './CardAdd'
import Card from './Card'

export default {
    components: {
        draggable,
        CardAdd,
        Card,
    },
    props: {
        title: {
            type: String,
            required: true
        },
        titleMemo: {
            type: String,
            required: true
        },
        cards: {
            type: Array,
            required: true
        },
        listIndex: {
            type: Number,
            required: true
        },
    },
    computed: {
        totalCardInList() {
            return this.cards.length
        }
    },
    methods: {
        removeList() {
            if (confirm('本当にこのリストを削除しますか？')) {
                this.$store.dispatch('removelist', { listIndex: this.listIndex })
            }
        }
    }
}
</script>