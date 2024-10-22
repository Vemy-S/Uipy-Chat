import server from "./socket"

server.listen(4000, () => {
    console.log(`server running on port ${4000}`)
})