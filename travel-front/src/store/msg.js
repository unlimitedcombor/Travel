import { marked } from 'marked'

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: {
        ADD_USER_MSG(state, msg) {
            state.list.push({
                role: "user",
                content: msg,
                status: 2
            })
        },
        ADD_AI_MSG(state, { content, status }) {
            let runMsg = state.list.find(i => i.status !== 2)
            if (!runMsg) {
                state.list.push({
                    role: "assistant",
                    content: content,
                    status: status
                })
            } else {
                runMsg.content += content
                runMsg.status = status
                if (status === 2) {
                    runMsg.content = marked(runMsg.content)
                }
            }
        },
        CLEAR_MESSAGES(state) {
            state.list = []
        }
    },
    actions: {
        userAddMsg({ commit }, msg) {
            commit('ADD_USER_MSG', msg)
        },
        aiAddMsg({ commit }, { content, status }) {
            commit('ADD_AI_MSG', { content, status })
        }
    }
} 