<template>
  <form :class="classList" @submit.prevent="addCardToList">
    <input v-model="body"
           type="text"
           class="text-input"
           placeholder="Add new card"
           @focusin="startEditing"
           @focusout="finishEditing"
    />

    <!-- <input v-model="hour"
           type="text"
           class="text-input-memo"
           placeholder="todo hour"
           @focusin="startEditing"
           @focusout="finishEditing"> -->

    <select v-model="hour" class="select-hour">
        <option disabled value="">工数を入れてください</option>
        <option v-for="period in hourList" :value="period.time" :key="period.id">
            {{ period.time }} hour
        </option>
    </select>

    <button type="submit"
            class="add-button"
            v-if="isEditing || bodyExists || hourExists">
      Add
    </button>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    listIndex: {
      type: Number,
      required: true
    }
  },
  data: function() {
    return {
      body: '',
      hour: '',
      isEditing: false,
    }
  },
  computed: {
      ...mapState([
            'lists',
            'hourList',
        ]),
        classList() {
            const classList = ['addcard']
            if(this.isEditing) {
                classList.push('active')
            }
            if(this.bodyExists || this.hourExists) {
                classList.push('addable')
            }
            return classList;
        },
        bodyExists() {
            return this.body.length > 0
        },
        hourExists() {
            return this.hour.length > 0
        }
  },
  methods: {
    startEditing: function() {
      this.isEditing = true
    },
    finishEditing: function() {
      this.isEditing = false
    },
    addCardToList() {
      this.$store.dispatch('addCardToList', { body: this.body,
                                              listIndex: this.listIndex,
                                              hour: this.hour})
      this.body = ''
      this.hour = ''
    }
  }
}
</script>