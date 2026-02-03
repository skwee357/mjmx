# frozen_string_literal: true

vm_name = File.basename(Dir.getwd)

NODE_VERSION = '24'

Vagrant.configure('2') do |config|
  config.vm.box = 'bento/ubuntu-24.04'

  config.vm.synced_folder('.', '/vagrant', type: 'virtualbox')

  config.vm.hostname = vm_name
  config.vm.network('private_network', type: 'dhcp')

  config.vm.provider('virtualbox') do |vb|
    vb.memory = '4096'
    vb.cpus = 2
    vb.gui = false
    vb.name = vm_name
    vb.customize(['modifyvm', :id, '--audio', 'none'])
    vb.customize(['modifyvm', :id, '--usb', 'off'])
  end

  config.vm.provision('shell', inline: <<-SHELL)
    export DEBIAN_FRONTEND=noninteractive

    apt-get update
    apt-get install -y avahi-daemon git unzip curl ca-certificates gnupg

    curl -fsSL https://deb.nodesource.com/setup_#{NODE_VERSION}.x | bash -
    apt-get install -y nodejs

    corepack enable
    corepack prepare pnpm@latest --activate

  SHELL

  config.vm.provision('shell', privileged: false, inline: <<-SHELL)
    curl -fsSL https://claude.ai/install.sh | bash
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> /home/vagrant/.bashrc
  SHELL
end
