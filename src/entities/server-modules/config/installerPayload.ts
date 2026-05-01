interface BaseProperties {
  serverID: number;
  version: string;
}

export type PayloadFn = (props: BaseProperties) => Record<string, unknown>;

export const payloadRtNodeJS: PayloadFn = (props) => {
  const { serverID, version } = props;

  return {
    installer_attributes: {
      nvm_install: 'curl',
      nvm_profile: '/etc/bash.bashrc',
      nvm_dir: '/usr/local/nvm',
      nodejs_version: version,
      nvm_commands: ['npm install -g pnpm', 'npm install -g yarn'],
      default: true,
    },
    installer_type: 'language',
    installer_name: 'nodejs',
    machine_id: serverID,
    name: `nodejs-${version}`,
  };
};

export const payloadRtPython: PayloadFn = (props) => {
  const { serverID, version } = props;

  return {
    installer_attributes: {
      pyenv_python_versions: [version],
      pyenv_global: [version],
      pyenv_env: 'system',
    },
    installer_type: 'language',
    installer_name: 'python',
    machine_id: serverID,
    name: `python-${version}`,
  };
};

export const payloadRtRuby: PayloadFn = (props) => {
  const { serverID, version } = props;

  return {
    installer_attributes: {
      rbenv: {
        default_ruby: version,
        rubies: [
          {
            version: version,
          },
        ],
        version: 'v1.3.0',
        env: 'system',
        // https://www.graalvm.org/latest/reference-manual/ruby/InstallingLibYAML/
        // rbenv_extra_depends: ["libyaml-dev"],
      },
    },
    installer_type: 'language',
    installer_name: 'ruby',
    machine_id: serverID,
    name: `ruby-${version}`,
  };
};

export const payloadRtGolang: PayloadFn = (props) => {
  const { serverID, version } = props;

  return {
    installer_attributes: {
      golang_version: version,
    },
    installer_type: 'language',
    installer_name: 'go',
    machine_id: serverID,
    name: `go-${version}`,
  };
};

export const payloadRtBun: PayloadFn = (props) => {
  const { serverID, version } = props;

  return {
    installer_attributes: {
      bun_version: version,
      bun_multi_version: true,
      bun_multi_set_default: true,
    },
    installer_type: 'language',
    installer_name: 'bun',
    machine_id: serverID,
    name: `bun-${version}`,
  };
};

export const payloadRtPHP: PayloadFn = (props) => {
  const { serverID, version } = props;

  return {
    installer_attributes: {
      php_version: version,
      php_enable_webserver: false,
      php_webserver_daemon: 'dpanel-router',
      php_executable: `php${version}`,
      php_default_version_debian: version,
      php_fpm_state: 'stopped',
      php_enable_php_fpm: false,
      php_fpm_enabled_on_boot: false,
      php_fpm_handler_state: 'stopped',
      php_fpm_listen: `/var/run/php${version}-fpm.sock`,
      php_fpm_listen_allowed_clients: '127.0.0.1',
    },
    installer_type: 'language',
    installer_name: 'php',
    machine_id: serverID,
    name: `php${version}`,
  };
};

export const payloadUtFFMPEG: PayloadFn = (props) => {
  const { serverID } = props;

  return {
    installer_attributes: {
      installer_packages: ['apt-utils', 'ffmpeg'],
      installer_state: 'present',
    },
    installer_type: 'utilities',
    installer_name: 'ffmpeg',
    machine_id: serverID,
    name: `ffmpeg`,
  };
};

export const payloadUtDocker: PayloadFn = (props) => {
  const { serverID } = props;

  return {
    installer_attributes: {
      docker_version: '28.3.3',
      docker_compose_version: '2.39.1',
      docker_download_dir: '/opt/tmp',
      dockerd_settings: {
        host: 'unix:///run/docker.sock',
        'log-level': 'info',
        'storage-driver':
          import.meta.env.VITE_ENVIRONMENT === 'development'
            ? 'vfs'
            : 'overlay2',
        iptables: 'true',
        'ip-masq': 'true',
        mtu: '1500',
      },
    },
    installer_type: 'container',
    installer_name: 'docker',
    machine_id: serverID,
    name: `docker`,
    module: {
      playbook: 'playbooks/module-docker.yml',
    },
  };
};

export const payloadUtFrankenPHP: PayloadFn = (props) => {
  const { serverID } = props;

  return {
    installer_attributes: {},
    installer_type: 'utilities',
    installer_name: 'frankenphp',
    machine_id: serverID,
    name: `frankenphp`,
    module: {
      playbook: 'playbooks/module-frankenphp.yml',
    },
  };
};

export const payloadUtCaddyServer: PayloadFn = (props) => {
  const { serverID } = props;

  return {
    installer_attributes: {
      router_action: 'install',
      router_git_version: 'tags/v0.1.0-alpha.1',
    },
    installer_type: 'infrastructure',
    installer_name: 'caddyserver',
    machine_id: serverID,
    name: `caddyserver`,
    module: {
      playbook: 'playbooks/module-caddyserver.yml',
    },
  };
};

export const payloadDbMariaDB: PayloadFn = (props) => {
  const { serverID } = props;

  return {
    installer_attributes: {
      mariadb_use_official_repo_version: 10.6,
      mariadb_bind_address: '0.0.0.0',
    },
    installer_type: 'database',
    installer_name: 'mariadb',
    machine_id: serverID,
    name: `mariadb`,
    module: {
      playbook: 'playbooks/module-mariadb.yml',
    },
  };
};

export const payloadDbPostgreSQL: PayloadFn = (props) => {
  const { serverID } = props;

  return {
    installer_attributes: {
      postgresql_version: '17',
      postgresql_listen_addresses: ['*'],
      postgresql_admin_user: 'postgres',
    },
    installer_type: 'database',
    installer_name: 'postgresql',
    machine_id: serverID,
    name: `postgresql`,
    module: {
      playbook: 'playbooks/module-postgresql.yml',
    },
  };
};

export const payloadDbMongo: PayloadFn = (props) => {
  const { serverID } = props;

  return {
    installer_attributes: {
      mongodb_version: '8.0.12',
      mongodb_net_bindip: '0.0.0.0',
      mongodb_security_authorization: 'enabled',
      disable_logging_for_auth: false,
    },
    installer_type: 'database',
    installer_name: 'mongodb',
    machine_id: serverID,
    name: `mongodb`,
    module: {
      playbook: 'playbooks/module-mongodb.yml',
    },
  };
};

export const payloadDbRedis: PayloadFn = (props) => {
  const { serverID } = props;

  return {
    installer_attributes: {
      redis_port: 6379,
      redis_bind_interface: '0.0.0.0',
    },
    installer_type: 'database',
    installer_name: 'redis',
    machine_id: serverID,
    name: `redis`,
    module: {
      playbook: 'playbooks/module-redis.yml',
    },
  };
};

export const payloadCmsAdminer: PayloadFn = (props) => {
  const { serverID } = props;

  return {
    installer_attributes: {
      adminer_port: 8080,
    },
    installer_type: 'cms',
    installer_name: 'adminer',
    machine_id: serverID,
    name: `adminer`,
    module: {
      playbook: 'playbooks/module-adminer.yml',
    },
  };
};

export const PAYLOAD_REGISTRY: Record<string, PayloadFn> = {
  redis: payloadDbRedis,
  mongodb: payloadDbMongo,
  mariadb: payloadDbMariaDB,
  postgresql: payloadDbPostgreSQL,
  adminer: payloadCmsAdminer,
  nodejs: payloadRtNodeJS,
  python: payloadRtPython,
  ruby: payloadRtRuby,
  golang: payloadRtGolang,
  go: payloadRtGolang,
  bun: payloadRtBun,
  php: payloadRtPHP,
  ffmpeg: payloadUtFFMPEG,
  docker: payloadUtDocker,
  frankenphp: payloadUtFrankenPHP,
  caddyserver: payloadUtCaddyServer,
};
