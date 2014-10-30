var Docker = require('dockerode');
var fs = require('fs');
// var docker = new Docker({
//   socketPath: '/var/run/docker.sock'
// });


// https://github.com/apocas/dockerode/issues/100

var docker = new Docker({
  protocol: 'https',
  host: '192.168.59.103',
  port: process.env.DOCKER_PORT || 2376,
  ca: fs.readFileSync(process.env.DOCKER_CERT_PATH + '/ca.pem'),
  cert: fs.readFileSync(process.env.DOCKER_CERT_PATH + '/cert.pem'),
  key: fs.readFileSync(process.env.DOCKER_CERT_PATH + '/key.pem')
});

// var docker = new Docker({protocol:'tcp', host: '192.168.59.103', port: 2376});
// xvfb-run --server-args='-screen 0, 1024x768x16' google-chrome -start-maximized http://7631f333.ngrok.com > /dev/null &

// xvfb-run -e /dev/stdout --server-args='-screen 0, 1024x768x16' google-chrome --disable-webgl -start-maximized http://7631f333.ngrok.com  &

// test the funky business of GPU
// git clone
// vagrant up
// vagrant ssh
// cd /vagrant
// npm i
// cd /examples/build
// node run.js

docker.buildImage('./Dockerfile.tar', {t: 'chrome'}, function(err, stream) {
  if(err) {
    return console.log(err);
  }

  stream.pipe(process.stdout, {end: true});

  stream.on('end', function() {
    console.log('image mounted');
    // done();
  });
});

// function done() {
//   docker.createContainer({
//     Image: 'chrome',
//     Cmd: ['/bin/bash', '-c', 'xvfb-run -e /dev/stdout --server-args=\'-screen 0, 1024x768x16\' google-chrome -start-maximized http://7631f333.ngrok.com']
//   }, function(err, container) {
//     container.attach({
//       stream: true,
//       stdout: true,
//       stderr: true,
//       tty: true
//     }, function(err, stream) {
//       if(err) return;

//       stream.pipe(process.stdout);

//       container.start({
//         Privileged: true
//       }, function(err, data) {
//         if(err) return;
//       });
//     });
//   });
// }