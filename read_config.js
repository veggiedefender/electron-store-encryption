const Conf = require('conf')

const config = new Conf({
    cwd: '.',
    encryptionKey: 'super secret key'
})

console.log(config.store)

const boom = config.get('boom')

if (boom) {
    console.log('LAUNCHING THE NUCLEAR WEAPONS, WATCH OUT!!')
    process.exit(0)
} else {
    console.log('Aborting nuclear weapon launch...')
    process.exit(1)
}
