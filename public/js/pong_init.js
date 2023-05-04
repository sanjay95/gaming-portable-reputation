Game.ready(function () {
    var pong = Game.start("game", Pong, {
        sound: false,
        stats: true,
        footprints: true,
        predictions: true,
    });
});
