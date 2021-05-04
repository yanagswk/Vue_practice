<template>
    <form :class="classList" @submit.prevent="addList">
        <input v-model="title"
               type="text"
               class="text-input"
               placeholder="Add To Do"
               @focusin="startEditing"
               @focusout="finishEditing"
        >
        <input v-model="titleMemo"
               type="text"
               class="text-input-memo"
               placeholder="To do Memo"
               @focusin="startEditing"
               @focusout="finishEditing"
        >
        <button type="submit"
                class="add-button"
                v-if="isEditing || titleExists || titleMemoExists">
                Add</button>
    </form>
</template>


<script>
export default {
    data() {
        return {
            title: '',
            titleMemo: '',
            isEditing: false,
        }
    },
    methods: {
        addList() {
            if (this.title.length === 0) {
                alert('titleを入力してください')
            } else {
                // action実行
                this.$store.dispatch('addlist', { title: this.title,
                                                  titleMemo: this.titleMemo })
                this.title = ''
                this.titleMemo = ''    
            }
        },
        startEditing() {
            this.isEditing = true
        },
        finishEditing() {
            this.isEditing = false
        }
    },
    computed: {
        classList() {
            const classList = ['addlist']
            if (this.isEditing) {
                classList.push('active')
            }
            if (this.titleExists || this.titleMemoExists) {
                classList.push('addable')
            }
            return classList
        },
        titleExists() {
            return this.title.length > 0
        },
        titleMemoExists() {
            return this.titleMemo.length > 0
        }
    }
}
</script>