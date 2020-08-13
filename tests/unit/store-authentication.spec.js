import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeAuthConfig from '../../src/store/modules/authentication'
import { cloneDeep } from 'lodash'
import Axios from 'axios'

describe('Test authentication store', () => {
    test('should mutate token', () => {
        const store = createStore()
        expect(store.state.token).toBe(null)
        const token = buildToken()

        store.commit('setToken', token)
        expect(store.state.token).toBe(token)
    })

    test('should identified logged user', () => {
        const store = createStore()
        expect(store.getters.isLogged).toBe(false)
        const token = buildToken()

        store.commit('setToken', token)
        expect(store.getters.isLogged).toBe(true)
    })

    test('should load token', () => {
        const store = createStore()
        const token = buildToken()
        localStorage.setItem('token', JSON.stringify(token))

        store.dispatch('loadToken')
        expect(store.state.token).toEqual(token)
        expect(Axios.defaults.headers.common['Authorization']).toEqual(`Bearer ${token.accessToken}`)
    })

    test('should not load token if not saved', () => {
        const store = createStore()
        localStorage.removeItem('token')
        store.dispatch('loadToken')
        expect(store.state.token).toBeNull()
    })

    test('should save token', () => {
        const store = createStore()
        const token = buildToken()
        expect(localStorage.getItem('token')).toBeNull()

        store.dispatch('saveToken', token)

        expect(store.state.token).toEqual(token)
        expect(localStorage.getItem('token')).toEqual(JSON.stringify(token))
        expect(Axios.defaults.headers.common['Authorization']).toEqual(`Bearer ${token.accessToken}`)
    })

    test('should clear token', () => {
        const store = createStore()
        const token = buildToken()

        store.dispatch('saveToken', token)
        expect(store.state.token).toEqual(token)

        store.dispatch('clearToken')
        expect(store.state.token).toBeNull()
        expect(localStorage.getItem('token')).toBeNull()
    })

    function createStore() {
        const localVue = createLocalVue()
        localVue.use(Vuex)
        const store = new Vuex.Store(cloneDeep(storeAuthConfig))
        return store
    }

    function buildToken() {
        return { accessToken: 'jwtToken' }
    }
})
