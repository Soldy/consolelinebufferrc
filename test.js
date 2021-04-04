const nanoTest  = new (require('nanoTest')).test({
    'debugPrint' : 'short'
});
const lineBufferRc = new (require('./index.js')).base();

let newId = 0;


nanoTest.add(
    'create new buffer',
    {
        'function': function(){
            newId = lineBufferRc.create();
            console.log(newId);
            return newId;
        },
        'options':['test1']
    },
    '==',
    newId
);

nanoTest.add(
    'set columns',
    {
        'function':lineBufferRc.set,
        'options':[
            newId,
            'columns',
            10
        ]
    },
    '===',
    true
);

nanoTest.add(
    'set columns',
    {
        'function':lineBufferRc.set,
        'options':[
            newId,
            'rows',
            5
        ]
    },
    '===',
    true
);

nanoTest.add(
    'add first line',
    {
        'function':lineBufferRc.add,
        'options':[
            newId,
            'hugo the amazing cool'
        ]
    },
    '===',
    true
);

nanoTest.add(
    'screen get',
    {
        'function':lineBufferRc.screen,
        'options':[
            newId
        ]
    },
    'j==',
    [
        '          ',
        '          ',
        'hugo the a',
        'mazing coo',
        'l         ' 
    ]
);

nanoTest.add(
    'add more line',
    {
        'function':lineBufferRc.add,
        'options':[
            newId,
            'hugo a dog'
        ]
    },
    '===',
    true
);

nanoTest.add(
    'screen get',
    {
        'function':lineBufferRc.screen,
        'options':[
            newId
        ]
    },
    'j==',
    [
        '          ',
        'hugo the a',
        'mazing coo',
        'l         ',
        'hugo a dog'
    ]
);

nanoTest.add(
    'add more line',
    {
        'function':lineBufferRc.add,
        'options':[
            newId,
            'not a cat'
        ]
    },
    '===',
    true
);
nanoTest.add(
    'add more line',
    {
        'function':lineBufferRc.add,
        'options':[
            newId,
            'not a rat'
        ]
    },
    '===',
    true
);

nanoTest.add(
    'screen get',
    {
        'function':lineBufferRc.screen,
        'options':[
            newId
        ]
    },
    'j==',
    [
        'mazing coo',
        'l         ',
        'hugo a dog',
        'not a cat ',
        'not a rat '
    ]
);

nanoTest.add(
    'original',
    {
        'function':lineBufferRc.original,
        'options':[
            newId
        ]
    },
    '===',
    'hugo the amazing cool\nhugo a dog\nnot a cat\nnot a rat'
);


nanoTest.run();
