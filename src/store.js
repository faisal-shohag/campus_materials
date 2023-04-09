
import {writable} from 'svelte/store'

export const appStore = writable({
    title: 'BRUR Materials'
})

export const database = writable({
    assignments: []
})