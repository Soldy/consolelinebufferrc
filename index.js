/*
 *  @Soldy\consolelinebufferrc\2021.01.21\GPL3
 */
'use strict';
const $setuprc = (require('setuprc')).base;

/*
 * @prototype
 */
const consoleLineBufferRcBase = function(){
    /*
     * @param {string} text
     * @public
     * @return {boolean}
     */
    this.add = function(text){
        _buffers.original =
            _buffers.original.concat(
                text.split(/\r\n|\n\r|\r|\n/)
            );
        _linesSplitter();
        return true;
    };
    this.screen = function(id, first){
        return _screen(id, first);
    };
    /*
     * @public
     * @return {string||boolean}
     */
    this.original=function(){
        return _buffers.original.join('\n');
    };
    /*
     * @param {string} name
     * @param {any} value
     * @public
     * @return {boolean}
     */
    this.set = function(name, value){
        return _setup.set(name, value);
    };
    /*
     * @param {string} name
     * @public
     * @return {any}
     */
    this.get = function(name){
        return _setup.get(name);
    };
    /*
     * @public
     * @return {boolean}
     */
    this.clear=function(){
        _buffers.original = [];
        _buffers.processed = [];
        return true;
    };
    /*
    * @private
    * @var {setuprc}
    */
    const _setup = new $setuprc({
        'rows':{
            'type'    : 'int',
            'default' : 20
        },
        'columns':{
            'type'    : 'int',
            'default' : 100
        }
    });
    /*
     * @private
     * @var json
     */
    let _buffers = {
        original  : [],
        processed : [],
    };
    /*
     * @param {integer}
     * @oprivate
     * @return {array}
     */
    const _screen  = function(first){
        first = _first(first);
        let line = first-1; // better than parse int
        let last = line + _setup.get('rows');
        let out = [];
        while (last>line++)
            out.push(
                _buffers.processed[line]
            );
        return out;
    };
    /*
     * @param {integer}
     * @oprivate
     * @return {integer}
     */
    const _first = function(first){
        if(
            (typeof first === 'undefined') ||
            (_buffers.setup.get('rows') > (_buffers.processed.length-first))
        )
            return _buffers.processed.length - _setup.get('rows');
        return first;
    };
    /*
    * @private
    */
    const _linesSplitter = function(){
        _buffers.processed = [];
        for(let i of _buffers.original)
            _buffers.processed = _buffers.processed.concat(
                _lineSplitter(i)
            );
        const count = _setup.get('rows') - _buffers.processed.length;
        if(count > 0 )
            _buffers.processed = _emptyLines(
                count,
                _setup.get('columns')
            ).concat(_buffers.processed);

    };
    /*
    * @param {integer}
    * @private
    * @return {array}
    */
    const _lineSplitter = function(line){
        let out = [];
        let columns = _setup.get('columns');
        while (line.length>0){
            out.push(
                line.substring(
                    0,
                    columns
                ).padEnd(columns)
            );
            line = line.substring(columns);
        }
        return out;
    };
    /*
    * @param {integer}
    * @private
    * @return {array}
    */
    const _emptyLines  = function(count){
        let out = [];
        for (let i = 0; count > i ; i++ )
            out.push((' ').padEnd(
                _setup.get('columns')
            ));
        return out;
    };
};

exports.base = consoleLineBufferRcBase;
