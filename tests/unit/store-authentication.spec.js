import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeAuthConfig from '../../src/store/modules/authentication'
import { cloneDeep } from 'lodash'
import Axios from 'axios'

describe('Test authentication store', () => {
    test('should mutate token', () => {
        const store = createStore()
        expect(store.state.accessToken).toBe(null)
        const token = buildToken()

        store.commit('setToken', token.accessToken)
        expect(store.state.accessToken).toBe(token.accessToken)
    })

    test('should identified logged user', () => {
        const store = createStore()
        expect(store.getters.isLogged).toBe(false)
        const token = buildToken()

        store.commit('setToken', token.accessToken)
        expect(store.getters.isLogged).toBe(true)
    })

    test('should load token', () => {
        const store = createStore()
        const token = buildToken()
        localStorage.setItem('token', token.accessToken)

        store.dispatch('loadToken')
        expect(store.state.accessToken).toEqual(token.accessToken)
        expect(Axios.defaults.headers.common['Authorization']).toEqual(`Bearer ${token.accessToken}`)
    })

    test('should not load token if not saved', () => {
        const store = createStore()
        localStorage.removeItem('token')
        store.dispatch('loadToken')
        expect(store.state.accessToken).toBeNull()
    })

    test('should save token', () => {
        const store = createStore()
        const token = buildToken()
        expect(localStorage.getItem('token')).toBeNull()

        store.dispatch('saveToken', token)

        expect(store.state.accessToken).toEqual(token.accessToken)
        expect(localStorage.getItem('token')).toEqual(token.accessToken)
        expect(Axios.defaults.headers.common['Authorization']).toEqual(`Bearer ${token.accessToken}`)
    })

    test('should clear token', () => {
        const store = createStore()
        const token = buildToken()

        store.dispatch('saveToken', token)
        expect(store.state.accessToken).toEqual(token.accessToken)

        store.dispatch('clearToken')
        expect(store.state.accessToken).toBeNull()
        expect(localStorage.getItem('token')).toBeNull()
        expect(Axios.defaults.headers.common['Authorization']).toBeUndefined()
    })

    function createStore() {
        const localVue = createLocalVue()
        localVue.use(Vuex)
        const store = new Vuex.Store(cloneDeep(storeAuthConfig))
        return store
    }

    function buildToken() {
        return { accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXZAbWV0ZW9yLmZyIiwiaWF0IjoxNjEzNDY5MjQ5LCJleHAiOjE2MTM0NjkzMDksImRvbmF0b3IiOmZhbHNlfQ.Sq2bsj0JbDA7RT_4KMMhdsTObt0r0cjUM107r8emct4dPyK0OTHZ8Gb3OEuY9K3POlKI_dj2WoCVGSFExxqsjQ' }
    }
})
