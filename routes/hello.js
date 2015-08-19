function routes(basePath, server, socket) {
    server.get(basePath + '/:name', function (req, res, next) {
        res.send('hello ' + req.params.name);
        next();
    });
    server.head(basePath + '/:name', function (req, res, next) {
        res.send('hello ' + req.params.name);
        next();
    });
}

module.exports = {
    register: routes
};
