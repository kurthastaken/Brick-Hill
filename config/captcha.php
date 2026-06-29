<?php

return [
    'secret' => env('NOCAPTCHA_SECRET', env('NO_CAPTCHA_SECRET')),
    'sitekey' => env('NOCAPTCHA_SITEKEY', env('NO_CAPTCHA_SITEKEY')),
    'options' => [
        'timeout' => 30,
    ],
];
