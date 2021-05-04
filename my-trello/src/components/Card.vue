<template>
    <div class="card">
        <button class="edit-button"
                @click="editCard">
            編集
        </button>
        <button class="close-button"
                @click="removeCardFromList">
            ✖︎
        </button>
        <div class="body">{{ body }}</div>
        <div class="hour">{{ hour }} hour</div>
    </div>
</template>


<script>
export default {
    props: {
        body: {
            type: String,
            required: true
        },
        listIndex: {
            type: Number,
            required: true
        },
        cardIndex: {
            type: Number,
            required: true
        },
        hour: {
            // type: Number
        }
    },
    methods: {
        removeCardFromList() {
            if (confirm('本当にこのカードを削除しますか？')) {
                this.$store.dispatch('removeCardFromList', {cardIndex: this.cardIndex,
                                                            listIndex: this.listIndex})
            }
        },
        editCard() {
            let editTitle = window.prompt('以下の内容でtitleを編集します。')
            if (editTitle.length > 0) {
                this.$store.dispatch('editCard', {cardIndex: this.cardIndex,
                                              listIndex: this.listIndex,
                                              editTitle: editTitle})
            } else {
                alert('入力欄が空欄です。')
            }
        }
    },
}
</script>