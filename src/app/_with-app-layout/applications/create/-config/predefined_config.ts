export const PREDEFINED_CONFIG = {
  github: {
    groups: [
      {
        group_id: 'adv_config',
        group_name: 'Advanced Configuration',
        group_desc:
          'Set up advanced configuration options for your application.',
        group_icon: 'settings',
        fields: [
          {
            id: 'adv_envvar',
            name: 'Environment Variables',
            description: 'One variable per line in KEY=value format',
            type: 'input_text_area',
            placeholder: 'KEY=value\nKEY2=value2',
            is_required: false,
            validation_regex: null,
            default_value: '',
          },
        ],
      },
    ],
  },
  bundle: {
    groups: [
      {
        group_id: 'db_config',
        group_name: 'Database Configuration',
        group_desc:
          "Configure your application's database connection, such as the database type and login credentials.",
        group_icon: 'database',
        fields: [
          {
            id: 'db_type',
            name: 'Database Type',
            description: null,
            type: 'cbo_database_type',
            is_required: true,
            placeholder: 'Database Type',
            default_value: '',
            validation_regex: null,
          },
          {
            id: 'db_name',
            name: 'Database Name',
            description: null,
            type: 'input_text',
            is_required: true,
            placeholder: null,
            default_value: '',
            validation_regex: '^[a-zA-Z0-9_]{3,15}$',
          },
          {
            id: 'db_user',
            name: 'Database User',
            description: null,
            type: 'input_text',
            is_required: true,
            placeholder: null,
            default_value: '',
            validation_regex: '^[a-zA-Z0-9_]{3,15}$',
          },
          {
            id: 'db_password',
            name: 'Database Password',
            description: null,
            type: 'input_text_password',
            is_required: true,
            placeholder: null,
            default_value: '',
            validation_regex: '^[a-zA-Z0-9_]{3,15}$',
          },
          // {
          //   id: "db_checkbox_create",
          //   name: "Create Database if it doesn't exist",
          //   description: null,
          //   type: "input_checkbox",
          //   is_required: true,
          //   placeholder: null,
          //   default_value: false,
          //   validation_regex: null,
          // },
        ],
      },
      {
        group_id: 'adv_config',
        group_name: 'Advanced Configuration',
        group_desc:
          'Set up advanced configuration options for your application.',
        group_icon: 'settings',
        fields: [
          {
            id: 'adv_envvar',
            name: 'Environment Variables',
            description: 'One variable per line in KEY=value format',
            type: 'input_text_area',
            placeholder: 'KEY=value\nKEY2=value2',
            is_required: false,
            validation_regex: null,
            default_value: '',
          },
        ],
      },
    ],
  },
};
