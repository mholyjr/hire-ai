<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'google' => [
        'project_id' => env('GOOGLE_SERVICE_ACC_PROJECT_ID'),
        'private_key_id' => env('GOOGLE_SERVICE_ACC_PRIVATE_KEY_ID'),
        'private_key' => env('GOOGLE_SERVICE_ACC_PRIVATE_KEY'),
        'client_email' => env('GOOGLE_SERVICE_ACC_CLIENT_EMAIL'),
        'client_id' => env('GOOGLE_SERVICE_ACC_CLIENT_ID'),
        'client_x509_cert_url' => env('GOOGLE_SERVICE_ACC_CLIENT_X509_CERT_URL'),
        'location_id' => env('GOOGLE_CLOUD_TASKS_LOCATION_ID'),
        'credentials_path' => env('GOOGLE_CLOUD_KEY_FILE'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URI')
    ],

    'openai' => [
        'api_key' => env('OPENAI_API_KEY'),
    ],

    'hireapp_ai_gcp' => [
        'url' => env('HIREAPP_AI_GCP_URL'),
        'api_key' => env('HIREAPP_AI_GCP_API_KEY'),
    ],

    'stripe' => [
        'secret' => env('STRIPE_SECRET'),
    ]
];
