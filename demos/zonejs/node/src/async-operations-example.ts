/* First Examole */
setTimeout(function () {

  console.log(Zone.current.name); // > '<root>' (get the name of the current zone)

  const myZone = Zone.current.fork({ name: 'myZone', properties: { user: null } });

  myZone.run(() => {

    const id = setTimeout(function () {
      console.log(Zone.current.name); // > 'myZone' (get the name of the current zone)
      console.log(Zone.current.parent.name) // > '<root>' (get the name of the parent zone)
    }, 5000);

    clearTimeout(id);
  });

}, 5000);