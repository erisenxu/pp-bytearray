# pp-bytearray
A very simple script for writing and reading bytes in Javascript with node.js and web browser support.

# Installation
$ npm install pp-bytearray

# Usage

<pre>
var ByteArray = require('pp-bytearray');

var baMsg = new ByteArray();
baMsg.appendInt8(0x09);         // append a byte to bytearray, make the array length to 1
// append a 32-bit interger to byte-array with Big-Endian
baMsg.appendUint32(0x12345678); // append a int to bytearray, make the array length to 5
// append a 64-bit interger to byte-array with Big-Endian
// The 64-bit interger must be a string
baMsg.appendUint64('18446744073709551615'); // append a long to bytearray, make the array length to 13

console.log(baMsg.getInt8(0));  // 9
console.log(baMsg.length);      // 1
console.log(baMsg.getUint32(1)); // 305419896 (=0x12345678)
console.log(baMsg.length);      // 5
console.log(baMsg.getUint64(5)); // 18446744073709551615
console.log(baMsg.length);      // 13

baMsg.buffer.writeUInt32BE(0xf0f0f0f0, 1);  // To write bytes by pos.
console.log(baMsg.getUint32(1)); // 4042322160 (=0xf0f0f0f0)

console.log(ByteArray.bytesToPrintable(baMsg.getBytes()));
// output:
// 0000  09 f0 f0 f0 f0 ff ff ff ff ff ff ff ff
</pre>

# API
<ul>
    <li>ByteArray.prototype.appendInt8(v):ByteArray</li>
    <li>ByteArray.prototype.appendUint8(v):ByteArray</li>
    <li>ByteArray.prototype.appendInt16(v):ByteArray</li>
    <li>ByteArray.prototype.appendUint16(v):ByteArray</li>
    <li>ByteArray.prototype.appendInt32(v):ByteArray</li>
    <li>ByteArray.prototype.appendUint32(v):ByteArray</li>
    <li>ByteArray.prototype.appendInt64(v:String):ByteArray</li>
    <li>ByteArray.prototype.appendUint64(v:String):ByteArray</li>
    <li>ByteArray.prototype.appendBytes(v:array,[offset, length]):ByteArray</li>
    <li>ByteArray.prototype.appendString(v):ByteArray</li>
    <li>ByteArray.prototype.getInt8(pos):int</li>
    <li>ByteArray.prototype.getUint8(pos):uint</li>
    <li>ByteArray.prototype.getInt16(pos):int</li>
    <li>ByteArray.prototype.getUint16(pos):uint</li>
    <li>ByteArray.prototype.getInt32(pos):int</li>
    <li>ByteArray.prototype.getUint32(pos):uint</li>
    <li>ByteArray.prototype.getInt64(pos):String</li>
    <li>ByteArray.prototype.getUint64(pos):String</li>
    <li>ByteArray.prototype.getBytes(pos, [length]):array</li>
    <li>ByteArray.prototype.buffer:Buffer</li>
    <li>ByteArray.fromUTF8(v:array):String</li>
    <li>ByteArray.toUTF8(v):array</li>
    <li>ByteArray.bytesToPrintable(v:array, startPos, endPos):array</li>
</ul>

# License
Copyright (c) 2013 erisenxu Licensed under the MIT license.