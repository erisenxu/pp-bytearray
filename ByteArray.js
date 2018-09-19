if (typeof require === "function") var bigInt = require("big-integer");

if (typeof Buffer === 'undefined') {

    Buffer = (function() {

        function Buffer(args) {
            var arr = new Uint8Array(args);
            arr.dataView = new DataView(arr.buffer);
            arr.__proto__ = Buffer.prototype;
            return arr;
        }
        Buffer.prototype.__proto__ = Uint8Array.prototype;
        Buffer.__proto__ = Uint8Array;

        Buffer.prototype.writeUInt8 = function(value, pos) {this.dataView.setUint8(pos, value);};
        Buffer.prototype.writeUInt16BE = function(value, pos) {this.dataView.setUint16(pos, value);};
        Buffer.prototype.writeUInt32BE = function(value, pos) {this.dataView.setUint32(pos, value);};
        Buffer.prototype.writeInt8 = function(value, pos) {this.dataView.setInt8(pos, value);};
        Buffer.prototype.writeInt16BE = function(value, pos) {this.dataView.setInt16(pos, value);};
        Buffer.prototype.writeInt32BE = function(value, pos) {this.dataView.setInt32(pos, value);};

        Buffer.prototype.readUInt8 = function(pos) {return this.dataView.getUint8(pos);};
        Buffer.prototype.readUInt16BE = function(pos) {return this.dataView.getUint16(pos);};
        Buffer.prototype.readUInt32BE = function(pos) {return this.dataView.getUint32(pos);};
        Buffer.prototype.readInt8 = function(pos) {return this.dataView.getInt8(pos);};
        Buffer.prototype.readInt16BE = function(pos) {return this.dataView.getInt16(pos);};
        Buffer.prototype.readInt32BE = function(pos) {return this.dataView.getInt32(pos);};

        Buffer.prototype.copy = function(target, targetStart, sourceStart, sourceEnd) {
            for (var i = targetStart, j = sourceStart; i < target.length && j < sourceEnd && j < this.length; i++, j++) {
                target[i] = this[j];
            }
        };

        return Buffer;
    })();
}

var ByteArray = (function() {
    "use strict";

    function ByteArray(params) {
        if (params instanceof Buffer) {
            this.length = params.length;
            this.buffer = params;
        } else {
            this.length = 0;
            this.buffer = new Buffer(params || 1024);
        }
    }

    ByteArray.prototype.clear = function() {
        this.length = 0;
    }

    ByteArray.prototype.appendInt8 = function(v) {
        this.expand(Int8Array.BYTES_PER_ELEMENT);
        this.buffer.writeInt8(v, this.length);
        this.length += Int8Array.BYTES_PER_ELEMENT;
        return this;
    };

    ByteArray.prototype.getInt8 = function(pos) {
        return this.buffer.readInt8(pos || 0);
    };

    ByteArray.prototype.appendUint8 = function(v) {
        this.expand(Uint8Array.BYTES_PER_ELEMENT);
        this.buffer.writeUInt8(v, this.length);
        this.length += Uint8Array.BYTES_PER_ELEMENT;
        return this;
    };

    ByteArray.prototype.getUint8 = function(pos) {
        return this.buffer.readUInt8(pos || 0);
    };

    ByteArray.prototype.appendInt16 = function(v) {
        this.expand(Int16Array.BYTES_PER_ELEMENT);
        this.buffer.writeInt16BE(v, this.length);
        this.length += Int16Array.BYTES_PER_ELEMENT;
        return this;
    };

    ByteArray.prototype.getInt16 = function(pos) {
        return this.buffer.readInt16BE(pos || 0);
    };

    ByteArray.prototype.appendUint16 = function(v) {
        this.expand(Uint16Array.BYTES_PER_ELEMENT);
        this.buffer.writeUInt16BE(v, this.length);
        this.length += Uint16Array.BYTES_PER_ELEMENT;
        return this;
    };

    ByteArray.prototype.getUint16 = function(pos) {
        return this.buffer.readUInt16BE(pos || 0);
    };

    ByteArray.prototype.appendInt32 = function(v) {
        this.expand(Int32Array.BYTES_PER_ELEMENT);
        this.buffer.writeInt32BE(v, this.length);
        this.length += Int32Array.BYTES_PER_ELEMENT;
        return this;
    };

    ByteArray.prototype.getInt32 = function(pos) {
        return this.buffer.readInt32BE(pos || 0);
    };

    ByteArray.prototype.appendUint32 = function(v) {
        this.expand(Uint32Array.BYTES_PER_ELEMENT);
        this.buffer.writeUInt32BE(v, this.length);
        this.length += Uint32Array.BYTES_PER_ELEMENT;
        return this;
    };

    ByteArray.prototype.getUint32 = function(pos) {
        return this.buffer.readUInt32BE(pos || 0);
    };

    ByteArray.prototype.appendInt64 = function(v) {
        var bg = new bigInt(v);
        this.expand(Float64Array.BYTES_PER_ELEMENT);
        this.buffer.writeUInt32BE(bg.shiftRight(32).and(0xFFFFFFFF), this.length);
        this.length += Uint32Array.BYTES_PER_ELEMENT;
        this.buffer.writeUInt32BE(bg.and(0xFFFFFFFF), this.length);
        this.length += Uint32Array.BYTES_PER_ELEMENT;
        return this;
    };

    ByteArray.prototype.getInt64 = function(pos) {
        var v1 = this.buffer.readUInt32BE(pos || 0);
        var v2 = this.buffer.readUInt32BE((pos || 0) + Uint32Array.BYTES_PER_ELEMENT);
        return new bigInt(v1).shiftLeft(32).or(v2).toString();
    };

    ByteArray.prototype.appendUint64 = function(v) {
        return this.appendInt64(v);
    };

    ByteArray.prototype.getUint64 = function(pos) {
        return this.getInt64(pos || 0);
    };

    ByteArray.prototype.appendBytes = function(v, start, len) {
        v = v || [];
        start = start || 0;
        len = len || v.length - start;
        var end = start + len;
        this.expand(len);
        for (var i = start; i < end; i++) {
            this.appendUint8(v[i]);
        }
        return this;
    };

    ByteArray.prototype.getBytes = function(start, len) {
        var v = this.buffer.slice(start || 0, len === undefined ? this.length : (len + start > this.length ? this.length : len + start));
        return Array.prototype.slice.call(v);
    };

    ByteArray.prototype.getBuffer = function() {
        return this.buffer.slice(0, this.length);
    };

    ByteArray.prototype.appendString = function(s) {
        s = s || '';
        this.appendBytes(ByteArray.toUTF8(s));
        return this;
    };

    ByteArray.prototype.expand = function(size) {
        if (size <= 0 || this.length + size <= this.buffer.length) return;

        var newBuffer = new Buffer(this.buffer.length + size);

        this.buffer.copy(newBuffer, 0, 0, this.length);

        this.buffer = newBuffer;
    };

    ByteArray.fromUTF8 = function(arr) {
        if (typeof arr === 'string') {
            return arr;
        }
        var UTF = '';
        for (var i = 0; i < arr.length; i++) {
            var one = arr[i].toString(2);
            var v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = arr[i].toString(2).slice(7 - bytesLength);
                for (var st = 1; st < bytesLength; st++) {
                    store += arr[st + i].toString(2).slice(2);
                }
                UTF += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            } else {
                UTF += String.fromCharCode(arr[i]);
            }
        }
        return UTF;
    };

    ByteArray.toUTF8 = function(s) {
        var back = [];
        var byteSize = 0;
        for (var i = 0; i < s.length; i++) {
            var code = s.charCodeAt(i);
            if (0x00 <= code && code <= 0x7f) {
                byteSize += 1;
                back.push(code);
            } else if (0x80 <= code && code <= 0x7ff) {
                byteSize += 2;
                back.push((192 | (31 & (code >> 6))));
                back.push((128 | (63 & code)));
            } else if ((0x800 <= code && code <= 0xd7ff) ||
                (0xe000 <= code && code <= 0xffff)) {
                byteSize += 3;
                back.push((224 | (15 & (code >> 12))));
                back.push((128 | (63 & (code >> 6))));
                back.push((128 | (63 & code)));
            }
        }
        for (i = 0; i < back.length; i++) {
            back[i] &= 0xff;
        }
        return back;
    };

    ByteArray.bytesToPrintable = function(b, start, end) {
        var s = '0000  ';
        var c = 0;
        start = start || 0;
        end = typeof end === 'undefined' ? b.length : end;
        for (var i = start; i < end; i++) {
            if (i > start && ((i - start) % 16 === 0)) {
                c += 16;
                s += '\n';
                s += c.toString(16).padStart(4, '0');
                s += '  ';
            }
            s += b[i].toString(16).padStart(2, '0');
            s += ' ';
        }
        return s;    
    };

    return ByteArray;
})();

// Node.js check
if (typeof module !== "undefined" && module.hasOwnProperty("exports")) {
    module.exports = ByteArray;
}

// amd check
if (typeof define === "function" && define.amd) {
    define("byte-array", [], function() {
        return ByteArray;
    });
}