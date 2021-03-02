function routes(app, onlineUsers) {
    // access index
    app.get('/', (req, res) => {
        console.log('GET REQUEST: index');
        res.sendFile('index.html', { root: './public' });
    })

    // access HTML pages
    app.get('/:page', (req, res) => {
        console.log('GET REQUEST: HTML page', req.params.page);
        res.sendFile(`${req.params.page}.html`, { root: './public' });
    })

    //userlist - SAM
    app.get('/api/usercheck/:username', async (req, res) => {
        if( true ){
        res.status(202).send( {code: 202, message:"continue to avatar choices."} );
        } else {
        res.status(404).send( {code: 404, message: "username already taken."});
        }
    })

    // registration request
    app.post('/api/register', async (req, res) => {
        console.log(`POST REQUEST: trying to add new user ${req.body.user}, pass: ${req.body.pw}, avatar: ${req.body.avatar}`);
        // ORM command to search for user
        if (/* user exists */ false) res.send({ message: 'failed' });
        else res.send({ message: 'success', accessKey: '1234' });
    })

    // login request
    app.get('/api/login', async (req, res) => {
        console.log(`GET REQUEST: trying to login as user ${req.headers.user}, pass: ${req.headers.pw}`);
        // ORM command to search for user
        if (/* user exists */ true) res.send({ message: 'success', accessKey: '1234' });
        else res.send({ message: 'failed' });
    })

    // request room list
    app.get('/api/rooms', async (req, res) => {
        console.log(`GET REQUEST: fetching rooms information`);
        const data = /* ORM command */[{}];
        res.send({ data });
    })

    // request previous messages
    app.get('/api/messages/:room', async (req, res) => {
        console.log(`GET REQUEST: fetching previous messages for room ${req.params.room}`);
        const data = /* ORM command */[{}];
        res.send({ data });
    })

    // request online users array
    app.get('/api/online/:room', async (req, res) => {
        console.log(`GET REQUEST: fetching list of online users for room ${req.params.room}`);
        // TO-DO: filter out users with same room as input
        res.send(onlineUsers);
    })
}

module.exports = routes;