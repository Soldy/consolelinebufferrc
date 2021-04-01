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
     * @param string {id}
     * @public
     * @return string {id}
     */
    this.create = function(id){
        if(typeof id === "undefined")
            id = _getSerial();
        id = id.toString();
        if (typeof _buffers[id] !== "undefined")
            return false;
        _buffers[id]={
             original  : [],
             processed : [],
             setup     : new $setuprc(_setup);
        }
        return id;
    }
    /*
     * @param string {id}
     * @param string {text}
     * @public
     * @return boolean
     */
    this.add = function(id, text){
        id = id.toString();
        if (!_checkBuffers(id))
            return false;
        _buffers[id].original.push(
            _buffer[id].original.concat(
                text.split(/\r\n|\n\r|\r|\n/)
            )
        );
        _lineSplitter(id);
        return true;
    }
    /*
     * @param string {id}
     * @public
     * @return string||boolean
     */
    this.getAll=function(id){
        if (!checkBuffers(id))
            return false;
        return _buffers[id.toString()].original;
    }
    /*
     * @param string {id}
     * @param integer {first}
     * @public
     * @return string||boolean
     */
    this.getScreen=function(id, first){
        id = id.toString();
        if(typeof first !== "undefined")
            first = 0;
        if (!_checkBuffers(id))
            return false;
        return _buffers[id].processed.slice(
            first,
            _buffers[id].height
        );
    }
    /*
     * @param integer {width}
     * @param integer {height}
     * @public
     * @return boolean
     */
    this.setScreen=function (width, height){
        if (!checkBuffers(id))
            return false;
        buffers[id].width=width;
        buffers[id].height=height;
        return true;
    }
    /*
     * @param string {id}
     * @public
     * @return boolean
     */
    this.clear=function(id){
        if (!_checkBuffers(id))
            return false;
        _buffers[id].original = [];
        return true;
    }
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
    }
    const _setup = {
        'rows':{
            'type'    : 'int',
            'default' : 20
        },
        'columns':{
            'type'    : 'int',
            'default' : 100
        }
    }
    /*
     * @private
     * @var json
     */
    let _buffers = {};
    /*
     * @param string {id}
     * @private
     * @return boolean
     */
    let _checkBuffers = function(id){
        if (typeof _buffers[id.toString()] === "undefined")
            return false;
        return true;
    }

    const _linesSplitter = function(id){
        _buffers[id].processed = [];
        for(let i of _buffers[id].original)
            _buffers[id].processed.concat(
                 _lineSplitter(
                     i,
                     _buffers[id].setup,get('column')
                 )
            );

    }
    const _lineSplitter = function(line, width){
        let out = [];
        while (line.length>width){
            out.push(
                line.substring(
                    0,
                    width
                )
            );
            line = line.substring(width);
        }
        return out;
    }
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
        id  = _serial.toString();
        _serial++;
        if (typeof _buffers[id] !== "undefined")
            _id = _getSerial();
        return id;
    }
}


