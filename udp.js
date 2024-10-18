const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const express = require('express');
const app = express();

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

const data = {};
server.on('message', (msg, rinfo) => {
    const msgString = msg.toString('utf8'); // Decode buffer to string

    // Split the message string into its components
    const parts = msgString.split(', ');

    parts.forEach(part => {
        const keyValue = part.split(': ');
        const key = keyValue[0] 
        const value = keyValue[1] 
        data[key] = value;
    });

   console.log(data); // Print JSON object to console
});


server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(4210);


module.exports = () => {
    return data;
};



