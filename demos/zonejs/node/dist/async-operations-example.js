setTimeout(function () {
    console.log(Zone.current.name);
    var myZone = Zone.current.fork({ name: 'myZone', properties: { user: null } });
    myZone.run(function () {
        var id = setTimeout(function () {
            console.log(Zone.current.name);
            console.log(Zone.current.parent.name);
        }, 5000);
        clearTimeout(id);
    });
}, 5000);
//# sourceMappingURL=async-operations-example.js.map