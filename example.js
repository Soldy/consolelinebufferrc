const lineBufferRc = new (require('./index.js')).base();

lineBufferRc.set('columns', 10);
lineBufferRc.set('rows', 5);

lineBufferRc.add(
    'hugo the amazing cool'
);

console.log(
    lineBufferRc.screen()
);

lineBufferRc.add(
    'hugo a dog'
);

console.log(
    lineBufferRc.screen()
);



lineBufferRc.add(
    'not a cat'
);

lineBufferRc.add(
    'not a rat'
);

console.log(
    lineBufferRc.screen()
);

console.log(
    lineBufferRc.original()
);


