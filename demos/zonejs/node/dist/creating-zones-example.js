var rootZone = Zone.current;
var myZone = rootZone.fork({ name: 'myZone', properties: { user: null, debug: false } });
myZone.run(function () {
    console.log(Zone.current.name);
    console.log(Zone.current.get('user'));
    console.log(Zone.current.parent.name);
    var myZoneChild = myZone.fork({
        name: 'MyZoneChild',
        properties: { user: { name: 'Ivan' } }
    });
    myZoneChild.run(function () {
        console.log(Zone.current.name);
        console.log(Zone.current.get('user'));
        console.log(Zone.current.get('debug'));
        console.log(Zone.current.parent.name);
    });
});
//# sourceMappingURL=creating-zones-example.js.map