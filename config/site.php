$aU = rtrim(env('ASSET_URL', ''), '/');

return [
    'name' => env('APP_NAME', 'Brick Hill Clone'),
    'logo' => $aU . '/images/logos/bh_small.png',
    'icon' => $aU . '/images/logos/bh_icon.png',
    'theme_color' => '#00A9FE',

    'route_domains' => [
        'main_site' => env('MAIN_SITE_DOMAIN'),
        'admin_site' => env('ADMIN_SITE_DOMAIN')
    ],

    'admin_prefix' => env('ADMIN_PREFIX', 'admin'),
    'storage_url' => rtrim(env('STORAGE_URL', env('APP_URL') . '/brkcdn'), '/'),
    'discord_url' => '',
    'emails' => [
        'support' => 'help@brick-hill.gt.tc',
        'moderation' => 'appeals@brick-hill.gt.tc'
    ],

    'system_user_id' => 1,
    'news_topic_id' => 1,
    'rules_thread_id' => null,
    'saint_item_id' => null,

    'username_change_price' => 250,
    'clan_creation_price' => 25,

    'flood_time' => 5,
    'forum_age_requirement' => 0,
    'message_age_requirement' => 0,

    'renderer' => [
        'url' => env('RENDER_URL'),
        'key' => env('RENDER_KEY'),
        'default_filename' => '7Nr5llNgVgiHUsBjw7mc'
    ],

    'admin_panel_code' => '',
    'maintenance_passwords' => [
        'freeaccess2026'
    ]
];