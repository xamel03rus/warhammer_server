import dgram from 'node:dgram'
import MessageService from "./services/MessageService.js";

export default function listenSocket() {
    const server = dgram.createSocket('udp4')

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`)
        server.close()
    })

    server.on('message', (msg, rinfo) => {
        console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)

        MessageService.Handle(server, rinfo.address, rinfo.port, msg)
    })

    server.on('listening', () => {
        const address = server.address()
        console.log(`server listening ${address.address}:${address.port}`)
    })

    server.bind(41234)
}