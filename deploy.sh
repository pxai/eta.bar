#!/bin/bash

cd /tmp
rm -rf /tmp/eta.bar

tar zxfp eta.bar.tgz && echo OK, sources ready

rm -rf /srv/www/eta.bar && echo deleted server

killall  node && echo OK, processes were killed
cd eta.bar/backend/config
cp production.json default.json && echo OK, copied config
mv /tmp/eta.bar /srv/www && echo OK, sources moved

cd /srv/www/eta.bar/backend
../node_modules/.bin/forever start app.js && echo OK, app started

netstat -ln | grep ":80" && echo UP and RUNNING
