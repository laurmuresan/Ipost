Vagrant.configure(2) do |config|
  config.vm.box = "centos-7.1.1503-x64-vagrant"
  config.vm.box_url = "https://dl.dropboxusercontent.com/u/63592816/vagrant/centos-7.1.1503-x64-vagrant.box"
  config.vm.box_check_update = true

  config.ssh.username = 'root'
  config.ssh.password = 'vagrant'
  config.ssh.insert_key = 'true'

  config.vm.network "forwarded_port", guest: 3001, host: 3001
  config.vm.network "forwarded_port", guest: 5000, host: 5000
  config.vm.network "forwarded_port", guest: 7000, host: 7000

  config.vm.synced_folder ".", "/vagrant/imm-web-client"

  config.vm.provider "virtualbox" do |vb|
    vb.name = "ipost"
    vb.gui = true
    vb.cpus = 1
    vb.memory = "1024"
  end

  # Create the node_modules folder inside the Linux VM as a workaround
  # for the Vagrant 1.7.4 on VirtualBox 5 path limit (max 260 chars)
  # https://www.virtualbox.org/ticket/11976
  # https://github.com/mitchellh/vagrant/issues/1953
  # https://github.com/fideloper/Vaprobash/issues/183#issuecomment-50773693
  config.vm.provision :shell, inline: <<-SHELL, run: "always"
    mkdir -p /opt/imm-web/node_modules
    mkdir /vagrant/imm-web-client/node_modules
    mount -o bind /opt/imm-web/node_modules /vagrant/imm-web-client/node_modules
  SHELL

  config.vm.provision "shell", inline: <<-SHELL
    systemctl disable firewalld
    systemctl stop firewalld
    yum install -y bzip2 gcc gcc-c++
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
    source /root/.bash_profile
    nvm install v4.2.1
    nvm alias default v4.2.1
    npm install -g npm
    rm -fr /vagrant/imm-web-client/node_modules/*
    cd /vagrant/imm-web-client
    npm rebuild node-sass
    npm install
    npm install -g gulp

  SHELL
end

# -*- mode: ruby -*-
# vi: set ft=ruby :
