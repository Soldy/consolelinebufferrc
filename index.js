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
     * @param {string} id
     * @public
     * @return {string} {id}
     */
    this.create = function(id){
        if(typeof id === 'undefined')
            id = _getSerial();
        id = id.toString();
        if (typeof _buffers[id] !== 'undefined')
            return false;
        _buffers[id]={
            original  : [],
            processed : [],
            setup     : new $setuprc(_setup)
        };
        return id;
    };
    /*
     * @param {string} id
     * @param {string} text
     * @public
     * @return {boolean}
     */
    this.add = function(id, text){
        id = id.toString();
        if (!_checkBuffers(id))
            return false;
        _buffers[id].original =
            _buffers[id].original.concat(
                text.split(/\r\n|\n\r|\r|\n/)
            );
        _linesSplitter(id);
        return true;
    };
    this.screen = function(id, first){
        return _screen(id, first);
    };
    /*
     * @param {string} id
     * @public
     * @return {string||boolean}
     */
    this.original=function(id){
        if (!_checkBuffers(id))
            return false;
        return _buffers[id.toString()].original.join('\n');
    };
    /*
     * @param {string} id
     * @param {string} name
     * @param {any} value
     * @public
     * @return {boolean}
     */
    this.set = function(id, name, value){
        if (!_checkBuffers(id))
            return false;
        return _buffers[id].setup.set(name, value);
    };
    /*
     * @param {string} id
     * @param {string} name
     * @public
     * @return {any}
     */
    this.get = function(id, name){
        if (!_checkBuffers(id))
            return false;
        return _buffers[id].setup.get(name);
    };
    /*
     * @param {string} id
     * @public
     * @return {setuprc}
     */
    this.setup = function(id){
        return _buffers[id].setup;
    };
    /*
     * @param {string} id
     * @public
     * @return {boolean}
     */
    this.clear=function(id){
        if (!_checkBuffers(id))
            return false;
        _buffers[id].original = [];
        return true;
    };
    /*
     * @param string {id}
     * @public
     * @return boolean
     */
    this.del=function(id){
        if (!_checkBuffers(id))
            return false;
        delete _buffers[id];
        return true;
    };
    /*
    * @private
    * @var {schemarc}
    */
    const _setup = {
        'rows':{
            'type'    : 'int',
            'default' : 20
        },
        'columns':{
            'type'    : 'int',
            'default' : 100
        }
    };
    /*
     * @private
     * @var json
     */
    let _buffers = {};
    /*
     * @param {string}
     * @param {integer}
     * @oprivate
     * @return {array}
     */
    const _screen  = function(id, first){
        first = _first(id, first);
        let line = first-1; // better than parse int
        let last = line + _buffers[id].setup.get('rows');
        let out = [];
        while (last>line++)
            out.push(
                _buffers[id].processed[line]
            );
        return out;
    };
    /*
     * @param {string}
     * @param {integer}
     * @oprivate
     * @return {integer}
     */
    const _first = function(id, first){
        if(
            (typeof first === 'undefined') ||
            (_buffers[id].setup.get('rows') > (_buffers[id].processed.length-first))
        )
            return _buffers[id].processed.length - _buffers[id].setup.get('rows');
        return first;
    };
    /*
     * @param string {id}
     * @private
     * @return boolean
     */
    const _checkBuffers = function(id){
        if (typeof _buffers[id.toString()] === 'undefined')
            return false;
        return true;
    };
    /*
    * @param {string}
    * @private
    */
    const _linesSplitter = function(id){
        _buffers[id].processed = [];
        for(let i of _buffers[id].original)
            _buffers[id].processed = _buffers[id].processed.concat(
                _lineSplitter(
                    i,
                    _buffers[id].setup.get('columns')
                )
            );
        const count = _buffers[id].setup.get('rows') - _buffers[id].processed.length;
        if(count > 0 )
            _buffers[id].processed = _emptyLines(
                count,
                _buffers[id].setup.get('columns')
            ).concat(_buffers[id].processed);

    };
    /*
    * @param {string}
    * @param {integer}
    * @private
    * @return {array}
    */
    const _lineSplitter = function(line, columns){
        let out = [];
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
    * @param {integer}
    * @private
    * @return {array}
    */
    const _emptyLines  = function(count, columns){
        let out = [];
        for (let i = 0; count > i ; i++ )
            out.push((' ').padEnd(columns));
        return out;
        
    };
    /*
     * @private
     * @var integer
     */
    let _serial = 0 ;
    /*
     * @private
     * @return string
     */
    const _getSerial = function(){
        let id  = _serial.toString();
        _serial++;
        if (typeof _buffers[id] !== 'undefined')
            id = _getSerial();
        return id;
    };
};

exports.base = consoleLineBufferRcBase;
