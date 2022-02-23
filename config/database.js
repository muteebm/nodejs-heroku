const pg = require('pg');
const ssh2 = require('ssh2');
var pgHost = 'ecometer.crxzobp4e645.ap-south-1.rds.amazonaws.com', // remote hostname/ip
    pgPort = 5432,
    proxyPort = 9090,
    ready = false;
const privateKey = require('fs').readFileSync(__dirname + '/bhavin2.pem');

var client;
var proxy = require('net').createServer(function(sock) {
    if (!ready)
      return sock.destroy();
    c.forwardOut(sock.remoteAddress, sock.remotePort, pgHost, pgPort, function(err, stream) {
      if (err)
        return sock.destroy();
      sock.pipe(stream);
      stream.pipe(sock);
    });
  });
  proxy.listen(proxyPort, '127.0.0.1');
  
  var c = new ssh2();
  c.connect({
    host : 'ec2-3-108-254-16.ap-south-1.compute.amazonaws.com',
    port : 22,
    username : 'ubuntu',
    privateKey : privateKey
  });
  c.on('connect', function() {
    console.log('Connection :: connect');
  });
  c.on('ready', function() {
    ready = true;
    var conString = 'postgres://postgres:ecometerangular@127.0.0.1:' + proxyPort + '/postgres';
        client = new pg.Client(conString);
    client.connect(function(err) {
      console.log('Connected !!!!');
    });
    
    client.on('connect', () => {
    });
  });


module.exports = {
    query: (text, params) => client.query(text, params),
};