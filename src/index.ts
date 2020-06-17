import { __main } from './fakevue'
import FakeVue from './fakevue'

__main()

let app = new FakeVue({
    el: '#app',
    data: {
        message: 'Hello FakeVue'
    },
})
