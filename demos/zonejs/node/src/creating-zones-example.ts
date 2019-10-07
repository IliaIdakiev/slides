const rootZone = Zone.current;

const myZone = rootZone.fork({ name: 'myZone', properties: { user: null, debug: false } });

myZone.run(() => {


  /* First Part Start */
  console.log(Zone.current.name); // > 'myZone' (get the name of the current zone)
  console.log(Zone.current.get('user')); // > null (get the poperty called user)
  console.log(Zone.current.parent.name) // > '<root>' (get the name of the root zone)
  /* First Part End */



  /* Second Part Start */
  const myZoneChild = myZone.fork({
    name: 'MyZoneChild',
    properties: { user: { name: 'Ivan' } }
  });

  myZoneChild.run(() => {
    console.log(Zone.current.name);
    // > 'myZoneChild' (get the name of the current zone)
    console.log(Zone.current.get('user'));
    // > { name: 'Ivan' } (get the property called user)
    console.log(Zone.current.get('debug'));
    // > false (get the property called user)
    console.log(Zone.current.parent.name)
    // > 'MyZone' (get the name of the parent zone)
  });
  /* Second Part End */

});
