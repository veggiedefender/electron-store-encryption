const Conf = require('conf')

const config = new Conf({
    cwd: '.',
    encryptionKey: 'super secret key'
})

config.set('message', 'a few words might get scrambled..')
config.set('boom', false)
