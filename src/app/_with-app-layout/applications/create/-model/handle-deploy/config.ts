interface BundleVars {
  appName: string;
  appDomain: string;
  serverID: number;
  userID: number;
  userName?: string;
  userEmail?: string;
  mariadbDbName: string;
  mariadbUsername: string;
  mariadbPassword: string;
  envVariables?: Array<Record<string, string>>;
}

export const getVarsWordpress = (vars: BundleVars) => {
  const {
    appName,
    appDomain,
    serverID,
    userID,
    userEmail,
    mariadbDbName,
    mariadbUsername,
    mariadbPassword,
    envVariables,
  } = vars;

  return {
    playbook: {
      name: 'playbooks/bundle-wordpress.yml',
      tag: 'all',
      roles: [
        {
          name: 'create-user',
          save_not_allowed_var: ['password'],
          variable: {
            user_id: userID,
          },
        },
        {
          name: 'devetek.mariadb',
          tag: 'database,mariadb,mariadb',
          save_not_allowed_var: ['mariadb_databases', 'mariadb_users'],
          variable: {
            mariadb_bind_address: '0.0.0.0',
            mariadb_databases: [
              {
                name: mariadbDbName,
                encoding: 'utf8',
                collation: 'utf8_general_ci',
                replicate: false,
              },
            ],
            mariadb_users: [
              {
                host: 'localhost',
                name: mariadbUsername,
                password: mariadbPassword,
                priv: `${mariadbDbName}.*:ALL`,
                resource_limits: {
                  MAX_USER_CONNECTIONS: 10,
                },
                state: 'present',
              },
            ],
          },
        },
        {
          name: 'geerlingguy.php-versions',
        },
        {
          name: 'geerlingguy.php',
          tag: 'language,php,php-8.4',
          variable: {
            php_version: '8.4',
            php_enable_webserver: false,
            php_enable_php_fpm: false,
            php_fpm_state: 'stopped',
            php_fpm_enabled_on_boot: false,
            php_packages_extra: ['sendmail'],
          },
        },
        {
          name: 'devetek.wpcli',
        },
        {
          name: 'devetek.wordpress',
          save_not_allowed_var: [
            'wordpress_user_admin_password',
            'wordpress_db_password',
          ],
          variable: {
            wordpress_user_linux: '{{ username }}',
            wordpress_user_email: userEmail,
            wordpress_user_admin: '{{ username }}',
            wordpress_user_admin_password: 'dpanel',
            wordpress_directory: '{{ deploy_workdir }}',
            wordpress_title: appName,
            wordpress_domain: '{{ router_domain }}',
            wordpress_db_host: 'localhost',
            wordpress_db_name: mariadbDbName,
            wordpress_db_user: mariadbUsername,
            wordpress_db_password: mariadbPassword,
            wordpress_install_type: 'singlesite',
          },
        },
        {
          name: 'devetek.phpfpm_pool',
          variable: {
            phpfpm_pool_user: '{{ username }}',
            phpfpm_pool_group: '{{ username }}',
            phpfpm_pool_conf_path:
              '/home/{{ username }}/run/php-fpm/{{ build_appname }}.conf',
            phpfpm_pools: [
              {
                pool_name: '{{ build_appname }}',
                pool_pm: 'static',
                pool_pid:
                  '/home/{{ username }}/run/php-fpm/{{ build_appname }}.pid',
                pool_listen:
                  '/home/{{ username }}/run/php-fpm/{{ build_appname }}.sock',
                pool_user: '{{ username }}',
                pool_group: '{{ username }}',
                pool_pm_max_children: 5,
                pool_pm_start_servers: 3,
                pool_pm_min_spare_servers: 3,
                pool_pm_max_spare_servers: 5,
                pool_php_fpm_pm_max_requests: 50,
                pool_php_admin_flag_display_errors: 'off',
                pool_php_admin_flag_log_errors: 'off',
                pool_global_error_log: '/dev/stdout',
                pool_slowlog: '/dev/stdout',
                pool_php_admin_value_error_log: '/dev/stdout',
              },
            ],
          },
        },
        {
          name: 'dpanel-build',
          variable: {
            build_appname: appName,
            build_user: '{{ username }}',
            build_destination: '/home/{{ username }}/apps/{{ build_appname }}',
            build_log: '/home/{{ username }}/logs/{{ build_appname }}',
            build_application_from_input: {
              version: 'v0.0.1-alpha.0',
              setup: {
                framework: 'wordpress',
                language: {
                  name: 'php',
                  version: '8.4',
                },
              },
              build: {
                target: {
                  machine: {
                    workir: '.',
                    steps: [
                      {
                        name: 'Build wordpress',
                        command: ['echo "No build command required!"'],
                      },
                    ],
                    environment: envVariables,
                  },
                },
              },
              run: {
                config: null,
                command:
                  'php-fpm --nodaemonize --fpm-config {{ phpfpm_pool_conf_path }}',
                no_service: false,
                environment: envVariables,
              },
            },
          },
        },
        {
          name: 'dpanel-deploy',
          variable: {
            deploy_workdir: '/home/{{ username }}/apps/{{ build_appname }}',
            deploy_logdir: '/home/{{ username }}/logs/{{ build_appname }}',
            deploy_service_name: 'devetek-{{ build_appname }}-{{ username }}',
            deploy_service_description:
              'Wordpress app from dPanel agnostic deployment',
            deploy_service_language_name: 'php',
            deploy_service_language_version: '{{ php_version }}',
            deploy_user: '{{ username }}',
            deploy_group: '{{ username }}',
            deploy_start_command:
              'php-fpm --nodaemonize --fpm-config {{ phpfpm_pool_conf_path }}',
            deploy_reload_command: '/bin/kill -USR2 $MAINPID',
            deploy_environment_variables: envVariables,
          },
        },
        {
          name: 'dpanel-router',
          variable: {
            router_action: 'create-vhost',
            router_domain: appDomain,
            router_content:
              'import php-wordpress-next {{ router_domain }} unix//home/{{ username }}/run/php-fpm/{{ build_appname }}.sock {{ wordpress_directory }}',
          },
        },
      ],
    },
    artifact: {
      branch: '',
      build_artifact: false,
      description: 'dpanel - PHP Wordpress bundle deployment',
      head: '',
      is_primary: true,
      machine_id: serverID,
    },
    deploy: {
      is_primary: true,
      machine_id: serverID,
    },
    default_branch: '',
    domain: appDomain,
    name: appName,
    repo_name: '',
    repo_org: '',
    repo_url: '',
    source: 'wordpress',
    type: 'bundle',
    user_id: userID,
  };
};

export const getVarsLaravel = (vars: BundleVars) => {
  const {
    appName,
    appDomain,
    serverID,
    userID,
    mariadbDbName,
    mariadbUsername,
    mariadbPassword,
    envVariables,
  } = vars;

  return {
    playbook: {
      name: 'playbooks/bundle-laravel.yml',
      tag: 'all',
      roles: [
        {
          name: 'create-user',
          save_not_allowed_var: ['password'],
          variable: {
            user_id: userID,
          },
        },
        {
          name: 'devetek.mariadb',
          tag: 'database,mariadb,mariadb',
          save_not_allowed_var: ['mariadb_databases', 'mariadb_users'],
          variable: {
            mariadb_bind_address: '0.0.0.0',
            mariadb_databases: [
              {
                name: mariadbDbName,
                encoding: 'utf8',
                collation: 'utf8_general_ci',
                replicate: false,
              },
            ],
            mariadb_users: [
              {
                host: 'localhost',
                name: mariadbUsername,
                password: mariadbPassword,
                priv: `${mariadbDbName}.*:ALL`,
                resource_limits: {
                  MAX_USER_CONNECTIONS: 10,
                },
                state: 'present',
              },
            ],
          },
        },
        {
          name: 'geerlingguy.php-versions',
        },
        {
          name: 'geerlingguy.php',
          tag: 'language,php,php-8.4',
          variable: {
            php_version: '8.4',
            php_enable_webserver: false,
            php_enable_php_fpm: false,
            php_fpm_state: 'stopped',
            php_fpm_enabled_on_boot: false,
            php_packages_extra: ['php{{ php_version }}-swoole'],
          },
        },
        {
          name: 'devetek.phpfpm_pool',
          variable: {
            phpfpm_pool_user: '{{ username }}',
            phpfpm_pool_group: '{{ username }}',
            phpfpm_pool_conf_path:
              '/home/{{ username }}/run/php-fpm/{{ build_appname }}.conf',
            phpfpm_pools: [
              {
                pool_name: '{{ build_appname }}',
                pool_pm: 'static',
                pool_pid:
                  '/home/{{ username }}/run/php-fpm/{{ build_appname }}.pid',
                pool_listen:
                  '/home/{{ username }}/run/php-fpm/{{ build_appname }}.sock',
                pool_user: '{{ username }}',
                pool_group: '{{ username }}',
                pool_pm_max_children: 5,
                pool_pm_start_servers: 3,
                pool_pm_min_spare_servers: 3,
                pool_pm_max_spare_servers: 5,
                pool_php_fpm_pm_max_requests: 50,
                pool_php_admin_flag_display_errors: 'off',
                pool_php_admin_flag_log_errors: 'off',
                pool_global_error_log: '/dev/stdout',
                pool_slowlog: '/dev/stdout',
                pool_php_admin_value_error_log: '/dev/stdout',
              },
            ],
          },
        },
        {
          name: 'geerlingguy.composer',
        },
        {
          name: 'devetek.laravel',
          variable: {
            laravel_source: 'cli',
            laravel_install_path: '{{ deploy_workdir }}',
            laravel_owner: '{{ username }}',
            laravel_group: '{{ username }}',
            laravel_php_executable: '/usr/bin/php{{ php_version }}',
            laravel_composer_executable: '/usr/local/bin/composer',
          },
        },
        {
          name: 'dpanel-build',
          variable: {
            build_appname: appName,
            build_user: '{{ username }}',
            build_destination: '/home/{{ username }}/apps/{{ build_appname }}',
            build_log: '/home/{{ username }}/logs/{{ build_appname }}',
            build_application_from_input: {
              version: 'v0.0.1-alpha.0',
              setup: {
                framework: 'laravel',
                language: {
                  name: 'php',
                  version: '8.4',
                },
              },
              build: {
                target: {
                  machine: {
                    workir: '.',
                    steps: [
                      {
                        name: 'Build laravel application',
                        command: [
                          'php artisan optimize:clear | echo "No cache need to clear"',
                          'cp .env.example .env',
                          'composer install --optimize-autoloader --no-dev',
                          'php artisan migrate',
                          'php artisan storage:link | echo "storage:link alrady exist"',
                          'php artisan key:generate | echo "APP_KEY already exist"',
                          'php artisan optimize',
                        ],
                      },
                    ],
                    environment: envVariables,
                  },
                },
              },
              run: {
                config: null,
                command:
                  'php-fpm --nodaemonize --fpm-config {{ phpfpm_pool_conf_path }}',
                no_service: false,
                environment: envVariables,
              },
            },
          },
        },
        {
          name: 'dpanel-deploy',
          variable: {
            deploy_workdir: '/home/{{ username }}/apps/{{ build_appname }}',
            deploy_logdir: '/home/{{ username }}/logs/{{ build_appname }}',
            deploy_service_name: 'devetek-{{ build_appname }}-{{ username }}',
            deploy_service_description: 'Laravel bundle application production',
            deploy_service_language_name: 'php',
            deploy_service_language_version: '{{ php_version }}',
            deploy_user: '{{ username }}',
            deploy_group: '{{ username }}',
            deploy_start_command:
              'php-fpm --nodaemonize --fpm-config {{ phpfpm_pool_conf_path }}',
            deploy_reload_command: '/bin/kill -USR2 $MAINPID',
            deploy_environment_variables: envVariables,
          },
        },
        {
          name: 'dpanel-router',
          variable: {
            router_action: 'create-vhost',
            router_domain: appDomain,
            router_content:
              'import phpfastcgi {{ router_domain }} unix//home/{{ username }}/run/php-fpm/{{ build_appname }}.sock {{ laravel_install_path }}/public',
          },
        },
      ],
    },
    artifact: {
      branch: '',
      build_artifact: false,
      description: 'Deploying PHP Laravel bundle to a VPS',
      head: '',
      is_primary: true,
      machine_id: serverID,
    },
    deploy: {
      is_primary: true,
      machine_id: serverID,
    },
    default_branch: '',
    domain: appDomain,
    name: appName,
    repo_name: '',
    repo_org: '',
    repo_url: '',
    source: 'laravel',
    type: 'bundle',
    user_id: userID,
  };
};
interface GitVars {
  gitProvider: string;
  gitHost: string;
  gitRepository: string;
  gitDefaultBranch: string;
  gitNickname: string;
  gitToken: string;
  gitBranch: string;
  gitHead: string;
  gitHeadDescription: string;
  appProgLang?: string;
  appProgLangVersion?: string;
  appName: string;
  appPort?: number;
  appBuildCommand: string[];
  appRunCommand: string;
  repoName: string;
  repoOrganization: string;
  repoURL: string;
  appDomain: string;
  serverID: number;
  userID: number;
  mariadbDbName: string;
  mariadbUsername: string;
  mariadbPassword: string;
  envVariables?: Array<Record<string, string>>;
}

export const getVarsGitLaravel = (vars: GitVars) => {
  const {
    appName,
    appPort,
    repoName,
    repoOrganization,
    repoURL,
    serverID,
    appDomain,
    userID,
    gitProvider,
    gitHost,
    gitRepository,
    gitDefaultBranch,
    gitNickname,
    gitToken,
    gitBranch,
    gitHead,
    gitHeadDescription,
    envVariables,
  } = vars;

  return {
    playbook: {
      name: 'playbooks/git-laravel.yml',
      tag: 'all',
      roles: [
        {
          name: 'create-user',
          save_not_allowed_var: ['password'],
          variable: {
            user_id: userID,
          },
        },
        {
          name: 'geerlingguy.php-versions',
        },
        {
          name: 'geerlingguy.php',
          tag: 'language,php,php-8.2',
          variable: {
            php_version: '8.2',
            php_enable_webserver: false,
            php_enable_php_fpm: false,
            php_fpm_state: 'stopped',
            php_fpm_enabled_on_boot: false,
            php_packages_extra: ['php8.2-swoole'],
          },
        },
        {
          name: 'geerlingguy.composer',
        },
        {
          name: 'dpanel-git',
          variable: {
            git_host: gitHost,
            git_version: gitBranch,
            git_repository: gitRepository,
            git_destination: '{{ build_destination }}',
            git_force: true,
            git_depth: 1,
            git_user: gitNickname,
            git_token: gitToken,
            git_linux_user: '{{ username }}',
          },
        },
        {
          name: 'dpanel-build',
          variable: {
            build_appname: 'laravel-app-github',
            build_user: '{{ username }}',
            build_destination: '/home/{{ username }}/apps/{{ build_appname }}',
            build_log: '/home/{{ username }}/logs/{{ build_appname }}',
            build_application_from_input: {
              version: 'v0.0.1-alpha.0',
              setup: {
                framework: 'laravel',
                language: {
                  name: 'php',
                  version: '8.2',
                },
              },
              build: {
                target: {
                  machine: {
                    workir: '.',
                    steps: [
                      {
                        name: 'Build laravel application',
                        command: [
                          'php artisan optimize:clear | echo "No cache need to clear"',
                          'touch database.db',
                          'cp .env.example .env',
                          'composer install --optimize-autoloader --no-dev',
                          'php artisan migrate',
                          'php artisan storage:link | echo "storage:link alrady exist"',
                          'php artisan key:generate | echo "APP_KEY already exist"',
                          'php artisan optimize',
                        ],
                      },
                    ],
                    environment: envVariables,
                  },
                },
              },
              run: {
                name: 'my-second-app',
                port: appPort,
                config: null,
                command:
                  'php artisan octane:start --server=swoole --host=localhost --port=${PORT} --workers=6 --task-workers=3',
                no_service: false,
                environment: envVariables,
              },
            },
          },
        },
        {
          name: 'dpanel-deploy',
          variable: {
            deploy_workdir: '/home/{{ username }}/apps/{{ build_appname }}',
            deploy_logdir: '/home/{{ username }}/logs/{{ build_appname }}',
            deploy_service_name: 'devetek-{{ build_appname }}-{{ username }}',
            deploy_service_description: 'Laravel application from github',
            deploy_service_language_name: 'php',
            deploy_service_language_version: '{{ php_version }}',
            deploy_user: '{{ username }}',
            deploy_group: '{{ username }}',
            deploy_start_command:
              'php artisan octane:start --server=swoole --host=localhost --port=${PORT} --workers=6 --task-workers=3',
            deploy_reload_command: '/bin/kill -USR2 $MAINPID',
            deploy_environment_variables: envVariables,
          },
        },
        {
          name: 'dpanel-router',
          variable: {
            router_action: 'create-vhost',
            router_domain: appDomain,
            router_content: `import proxypass {{ router_domain }} localhost:${appPort}`,
          },
        },
      ],
    },
    artifact: {
      branch: gitBranch,
      build_artifact: false,
      description: gitHeadDescription,
      head: gitHead,
      is_primary: true,
      machine_id: serverID,
    },
    deploy: {
      is_primary: true,
      machine_id: serverID,
    },
    default_branch: gitDefaultBranch,
    domain: appDomain,
    name: appName,
    repo_name: repoName,
    repo_org: repoOrganization,
    repo_url: repoURL,
    source: gitProvider,
    type: 'git',
    user_id: userID,
  };
};

export const getVarsGit = (vars: GitVars) => {
  const {
    appProgLang,
    appProgLangVersion,
    appName,
    appBuildCommand,
    appRunCommand,
    appPort,
    repoName,
    repoOrganization,
    repoURL,
    serverID,
    appDomain,
    userID,
    gitProvider,
    gitHost,
    gitRepository,
    gitDefaultBranch,
    gitNickname,
    gitToken,
    gitBranch,
    gitHead,
    gitHeadDescription,
    envVariables,
  } = vars;

  const useDomain = {
    name: 'dpanel-router',
    variable: {
      router_action: 'create-vhost',
      router_domain: appDomain,
      router_content: `import proxypass {{ router_domain }} localhost:${appPort}`,
    },
  };

  let useRole: unknown[] = [];
  const phpPackagesExtra: string[] = [];
  switch (appProgLang) {
    case 'go':
      useRole = [
        {
          name: 'gantsign.golang',
          tag: `language,${appProgLang},${appProgLang}-${appProgLangVersion}`,
          variable: {
            golang_version: appProgLangVersion,
          },
        },
      ];
      break;
    case 'python':
      useRole = [
        {
          name: 'staticdev.pyenv',
          tag: `language,${appProgLang},${appProgLang}-${appProgLangVersion}`,
          variable: {
            pyenv_python_versions: [appProgLangVersion],
            pyenv_global: [appProgLangVersion],
            pyenv_env: 'system',
          },
        },
      ];
      break;
    case 'php':
      if (appProgLangVersion?.includes('8.')) {
        phpPackagesExtra.push(`php${appProgLangVersion}-swoole`);
      }

      useRole = [
        {
          name: 'geerlingguy.php-versions',
        },
        {
          name: 'geerlingguy.php',
          tag: `language,${appProgLang},${appProgLang}-${appProgLangVersion}`,
          variable: {
            php_version: appProgLangVersion,
            php_enable_webserver: false,
            php_enable_php_fpm: false,
            php_fpm_state: 'stopped',
            php_fpm_enabled_on_boot: false,
            php_packages_extra: phpPackagesExtra,
          },
        },
        {
          name: 'geerlingguy.composer',
        },
      ];
      break;
    case 'ruby':
      useRole = [
        {
          name: 'zzet.rbenv',
          tag: `language,${appProgLang},${appProgLang}-${appProgLangVersion}`,
          variable: {
            default_ruby: appProgLangVersion,
            rubies: [
              {
                version: appProgLangVersion,
              },
            ],
            version: 'v1.3.0',
            env: 'system',
          },
        },
      ];
      break;
    case 'nodejs':
      useRole = [
        {
          name: 'morgangraphics.ansible-role-nvm',
          tag: `language,${appProgLang},${appProgLang}-${appProgLangVersion}`,
          variable: {
            nvm_install: 'curl',
            nvm_profile: '/etc/bash.bashrc',
            nvm_dir: '/usr/local/nvm',
            nodejs_version: appProgLangVersion,
            nvm_commands: ['npm install -g pnpm', 'npm install -g yarn'],
            default: true,
          },
        },
      ];
      break;
    case 'bun':
      useRole = [
        {
          name: 'devetek.bun',
          tag: `language,${appProgLang},${appProgLang}-${appProgLangVersion}`,
          variable: {
            bun_version: appProgLangVersion,
            bun_multi_version: true,
            bun_multi_set_default: true,
          },
        },
      ];
      break;
    case 'docker':
      useRole = [
        {
          name: 'githubixx.docker',
          tag: `container,${appProgLang},${appProgLang}`,
          variable: {
            docker_version: appProgLangVersion || '28.3.2',
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
        },
      ];
      break;
  }

  return {
    playbook: {
      name: `playbooks/git-${appProgLang}.yml`,
      tag: 'all',
      roles: [
        {
          name: 'create-user',
          save_not_allowed_var: ['password'],
          variable: {
            user_id: userID,
          },
        },
        ...useRole,
        {
          name: 'dpanel-git',
          variable: {
            git_host: gitHost,
            git_version: gitBranch,
            git_repository: gitRepository,
            git_destination: '{{ build_destination }}',
            git_force: true,
            git_depth: 1,
            git_user: gitNickname,
            git_token: gitToken,
            git_linux_user: '{{ username }}',
          },
        },
        {
          name: 'dpanel-build',
          variable: {
            build_appname: appName,
            build_user: '{{ username }}',
            build_destination: '/home/{{ username }}/apps/{{ build_appname }}',
            build_log: '/home/{{ username }}/logs/{{ build_appname }}',
            build_application_from_input: {
              version: 'v0.0.1-alpha.0',
              setup: {
                language: {
                  name: appProgLang,
                  version: appProgLangVersion,
                },
              },
              build: {
                target: {
                  machine: {
                    workir: '.',
                    steps: [
                      {
                        name: 'Build application from github',
                        command: appBuildCommand,
                      },
                    ],
                    environment: envVariables,
                  },
                },
              },
              run: {
                name: appName,
                port: appPort,
                config: null,
                command: appRunCommand,
                no_service: false,
                environment: envVariables,
              },
            },
          },
        },
        {
          name: 'dpanel-deploy',
          variable: {
            deploy_workdir: '/home/{{ username }}/apps/{{ build_appname }}',
            deploy_logdir: '/home/{{ username }}/logs/{{ build_appname }}',
            deploy_service_name: 'devetek-{{ build_appname }}-{{ username }}',
            deploy_service_description: gitHeadDescription,
            deploy_service_language_name: appProgLang,
            deploy_service_language_version: appProgLangVersion,
            deploy_user: '{{ username }}',
            deploy_group: '{{ username }}',
            deploy_start_command: appRunCommand,
            deploy_reload_command: '/bin/kill -USR2 $MAINPID',
            deploy_environment_variables: envVariables,
          },
        },
        appDomain !== '' ? useDomain : null,
      ],
    },
    artifact: {
      branch: gitBranch,
      build_artifact: false,
      description: gitHeadDescription,
      head: gitHead,
      is_primary: true,
      machine_id: serverID,
    },
    deploy: {
      is_primary: true,
      machine_id: serverID,
    },
    default_branch: gitDefaultBranch,
    domain: appDomain,
    name: appName,
    repo_name: repoName,
    repo_org: repoOrganization,
    repo_url: repoURL,
    source: gitProvider,
    type: 'git',
    user_id: userID,
  };
};
