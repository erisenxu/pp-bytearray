# pp-bytearray
A very simple script for writing and reading bytes in Javascript with node.js and web browser support.

# Installation
$ npm install pp-bytearray

# Usage

<pre>
var ByteArray = require('pp-bytearray');

var baMsg = new ByteArray();
baMsg.appendInt8(0x09);
baMsg.appendUint32(0x12345678);
baMsg.appendUint64('18446744073709551615');

console.log(baMsg.getInt8(0));
console.log(baMsg.getUint32(1));
console.log(baMsg.getUint64(5));
</pre>

# License
Copyright (c) 2013 erisenxu Licensed under the MIT license.