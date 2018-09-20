# pp-bytearray
A very simple script for writing and reading bytes in Javascript with node.js and web browser support.

# Installation
If you are using a browser, you can download ByteArray.min.js from GitHub and then hotlink to it(note: you must hotlink BigInteger firstly):
<pre>
&lt;script src="http://peterolson.github.com/BigInteger.js/BigInteger.min.js"&gt;&lt;/script&gt;
&lt;script src="ByteArray.min.js"&gt;&lt;/script&gt;
</pre>
If you are using node, you can install ByteArray with npm.
<pre>
$ npm install pp-bytearray
</pre>

# Usage

<pre>
var ByteArray = require('pp-bytearray');

var baMsg = new ByteArray();
baMsg.appendInt8(0x09);         // append a byte to bytearray, make the array length to 1
console.log(baMsg.length);      // 1
// append a 32-bit interger to byte-array with Big-Endian
baMsg.appendUint32(0x12345678); // append a int to bytearray, make the array length to 5
console.log(baMsg.length);      // 5
// append a 64-bit interger to byte-array with Big-Endian
// The 64-bit interger must be a string
baMsg.appendUint64('18446744073709551615'); // append a long to bytearray, make the array length to 13
console.log(baMsg.length);      // 13
// append a string using utf8 encoding to byte-array with Big-Endian
baMsg.appendString('pp-bytearray是一个动态数组，可以将数据按网络字节序(Big-Endian)写入数组，可用于协议打包-解包');

console.log(baMsg.getInt8(0));  // 9
console.log(baMsg.getUint32(1)); // 305419896 (=0x12345678)
console.log(baMsg.getUint64(5)); // 18446744073709551615
console.log(ByteArray.fromUTF8(baMsg.getBytes(13))); // pp-bytearray是一个动态数组，可以将数据按网络字节序(Big-Endian)写入数组，可用于协议打包-解包

// Change bytes by using ByteArray.prototype.buffer
baMsg.buffer.writeUInt32BE(0xf0f0f0f0, 1);  // Use ByteArray.prototype.buffer to write bytes by pos.
console.log(baMsg.getUint32(1)); // 4042322160 (=0xf0f0f0f0)

console.log(ByteArray.bytesToPrintable(baMsg.getBytes()));
// output:
0000  09 f0 f0 f0 f0 ff ff ff ff ff ff ff ff 70 70 2d
0010  62 79 74 65 61 72 72 61 79 e6 98 af e4 b8 80 e4
0020  b8 aa e5 8a a8 e6 80 81 e6 95 b0 e7 bb 84 ef bc
0030  8c e5 8f af e4 bb a5 e5 b0 86 e6 95 b0 e6 8d ae
0040  e6 8c 89 e7 bd 91 e7 bb 9c e5 ad 97 e8 8a 82 e5
0050  ba 8f 28 42 69 67 2d 45 6e 64 69 61 6e 29 e5 86
0060  99 e5 85 a5 e6 95 b0 e7 bb 84 ef bc 8c e5 8f af
0070  e7 94 a8 e4 ba 8e e5 8d 8f e8 ae ae e6 89 93 e5
0080  8c 85 2d e8 a7 a3 e5 8c 85
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
    <li>ByteArray.prototype.appendBytes(v:array[,offset [,length]]):ByteArray</li>
    <li>ByteArray.prototype.appendString(v):ByteArray</li>
    <li>ByteArray.prototype.getInt8(pos):int</li>
    <li>ByteArray.prototype.getUint8(pos):uint</li>
    <li>ByteArray.prototype.getInt16(pos):int</li>
    <li>ByteArray.prototype.getUint16(pos):uint</li>
    <li>ByteArray.prototype.getInt32(pos):int</li>
    <li>ByteArray.prototype.getUint32(pos):uint</li>
    <li>ByteArray.prototype.getInt64(pos):String</li>
    <li>ByteArray.prototype.getUint64(pos):String</li>
    <li>ByteArray.prototype.getBytes(pos[, length]):array</li>
    <li>ByteArray.prototype.clear():void</li>
    <li>ByteArray.prototype.buffer:Buffer</li>
    <li>ByteArray.fromUTF8(v:array):String</li>
    <li>ByteArray.toUTF8(v):array</li>
    <li>ByteArray.bytesToPrintable(v:array[, startPos[, endPos]]):array</li>
</ul>

# License
Copyright (c) 2013 erisenxu Licensed under the MIT license.