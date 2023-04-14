const nanoTest  = new (require('nanoTest')).test({
    'progress_bar' : false,
    'debug_print' : 'short'
});
const lineBufferRc = new (require('./index.js')).base();

nanoTest.add(
    'set columns',
    {
        'function':lineBufferRc.set,
        'options':[
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
        'options':[]
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
        'options':['hugo a dog']
    },
    '===',
    true
);

nanoTest.add(
    'screen get',
    {
        'function':lineBufferRc.screen,
        'options':[]
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
        'options':['not a cat']
    },
    '===',
    true
);
nanoTest.add(
    'add more line',
    {
        'function':lineBufferRc.add,
        'options':['not a rat']
    },
    '===',
    true
);

nanoTest.add(
    'screen get',
    {
        'function':lineBufferRc.screen,
        'options':[]
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
        'options':[]
    },
    '===',
    'hugo the amazing cool\nhugo a dog\nnot a cat\nnot a rat'
);


nanoTest.run();
