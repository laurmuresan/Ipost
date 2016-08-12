# iMM Web Client
### Simple, intuitive and back-end agnostic user interface

## Automated setup using Vagrant (using a VM)

Install Vagrant and dependencies:

* install [VirtualBox 5](https://www.virtualbox.org/wiki/Downloads) and the *VirtualBox Extension Pack*
* install [Vagrant](http://www.vagrantup.com/downloads)

*Note:* All `vagrant` commands must be run from inside the root folder of the current repository.

Create the VM using Vagrant:

    vagrant up --provision

Start the development server on the VM:

    vagrant ssh -c 'cd /vagrant/imm-web-client; npm start'

When finished working, halt the VM:

    vagrant halt

To start the VM again use:

    vagrant up --provision

## Manual setup (local installation)

*Note:* the preferred setup method is using Vagrant. Only install locally if you have problems with Vagrant.

#### Development

* before starting make sure you have NodeJS and NPM installed and configured
* npm install
* npm install -g gulp
* gulp --development --exorcist

#### Build for production

* before starting make sure you have NodeJS and NPM installed and configured
* npm install
* npm install -g gulp
* gulp --production
* all files for going live can be found in static directory in `css`,
`font`, `img`, `js` and `svg` sub-directories. Normally you would use the same
structure in production and make sure static assets are served from the same
 directories to ease the build process (manual or automated)
