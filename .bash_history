# Make /data/1 directory
sudo mkdir -p /data/1

# Grant directory permissions to non-root user
chown -R ec2-user /data

# Download node
sudo yum install nodejs20

# Create sym links for node and npm
sudo ln -s /usr/bin/node-20 /usr/local/bin/node
sudo ln -s /usr/bin/npm-20 /usr/local/bin/npm
sudo ln -s /usr/bin/npx-20 /usr/local/bin/npx

# Assuming that the repo was already copied over,
# Navigate to project directory and install dependencies
cd /data/1/ez-app
npm i 

# Run build 
npm run build

# Generate dameon-service related directories
mkdir -p /opt/ez-app/ /var/log/ez-app

# Generate unit file
sudo vim /etc/systemd/system/eztrack.service

### Unit file:
# [Unit]
# Description=React application for EzTrack
# After=network.target multi-user.target
# 
# [Service]
# User=ec2-user
# WorkingDirectory=/data/1/ez-app/dist <-- Make sure this points to /dist folder
# ExecStart=npm run preview
# Restart=always
# Environment=NODE_ENV=production
# 
# [Install]
# WantedBy=multi-user.target

# Start application service and check status
sudo systemctl daemon-reload && sudo systemctl enable ez-app.service && sudo systemctl start ez-app.service
sudo systemctl status ez-app.service

# Install Caddy
curl -sS https://webi.sh/caddy | sh

# Make Caddy config file in project directory. Probably should be somewhere else 
sudo vim ./Caddyfile

### Caddy file (extremely simple)
# :80 {
#       reverse_proxy localhost:4000    
# }

# Allow Caddy to operate on privileged ports (<1024) without being root
sudo setcap 'cap_net_bind_service=+ep' /home/ec2-user/.local/opt/caddy-v2.7.6/bin/caddy

# Run Caddy as a daemon service and specify config + optional env file
caddy run --config ./Caddyfile --envfile /data/1/.caddy/env

# Verify that Caddy is fetching index.html
curl http://localhost:80

curl -fsS https://webi.sh/ssh-adduser | sh
webi setcap-netbind
setcap-netbind

my_caddy_path="$( command -v caddy )"
my_caddy_absolute="$( readlink -f "${my_caddy_path}" )"
echo $my_caddy_absolute
sudo setcap cap_net_bind_service=+ep "${my_caddy_absolute}"

webi serviceman

my_username="$( id -u -n )"

# sudo env PATH="$PATH" serviceman add --system --username "${my_username}" --name caddy -- caddy run --config /data/1/ez-app/Caddyfile

sudo env PATH="$PATH" serviceman add --system --cap-net-bind --username "${my_username}" --name caddy -- caddy run --config /data/1/ez-app/Caddyfile

sudo systemctl restart caddy
sudo journalctl -xefu caddy

