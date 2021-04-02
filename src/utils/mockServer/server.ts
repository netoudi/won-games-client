import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export default server = setupServer(...handlers)
