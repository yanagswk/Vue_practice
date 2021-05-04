import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedLists = localStorage.getItem('trello-lists')

const store =  new Vuex.Store({
    state: {
        lists: savedLists ? JSON.parse(savedLists): [
            {
                title: 'Backlog',
                titleMemo: '過去のTodo',
                cards: [
                    { body: 'English', hour: 1 },
                    { body: 'Mathematics', hour: 3.0 },
                ]
            },
            {
                title: 'Todo',
                titleMemo: '現在のTodo',
                cards: [
                    { body: 'Science', hour: 6.0 }
                ]
            },
            {
                title: 'Doing',
                titleMemo: '将来のTodo',
                cards: []
            }
        ],
        hourList: [
            {id: 1, time: 1},
            {id: 2, time: 2},
            {id: 3, time: 3},
            {id: 4, time: 4},
            {id: 5, time: 5}
        ]
    },
    mutations: {
    addlist(state, payload) {
        state.lists.push({ title: payload.title,
                            titleMemo: payload.titleMemo,
                            cards:[] })
    },
    removelist(state, payload) {
        state.lists.splice(payload.listIndex, 1)
    },
    addCardToList(state, payload) {
        state.lists[payload.listIndex].cards.push({ body: payload.body, hour: payload.hour })
    },
    removeCardFromList(state, payload) {
        state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    },
    updateList(state, payload) {
        state.lists = payload.lists
    },
    editCard(state, payload) {
        state.lists[payload.listIndex].cards[payload.cardIndex]['body'] = payload.editTitle
    }
    },
    actions: {
    addlist(context, payload) {
        // commitでmutation実行
        context.commit('addlist', payload)
    },
    removelist(context, payload) {
        context.commit('removelist', payload)
    },
    addCardToList(context, payload) {
        context.commit('addCardToList', payload)
    },
    removeCardFromList(context, payload) {
        context.commit('removeCardFromList', payload)
    },
    updateList(context, payload) {
        context.commit('updateList', payload)
    },
    editCard(context, payload) {
        context.commit('editCard', payload)
    }
    },
    getters: {
        totalCardCount(state) {
            let count = 0
            state.lists.map(content => count += content.cards.length)
            return count
        }
    }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

export default store
