const awsConfigs = {
    sonic: {
      aws_project_region: "eu-west-2",
      // "aws_cognito_identity_pool_id": "us-east-1:d039d9a0-5f87-4657-9cb5-ddb84203606c",
      aws_cognito_region: "eu-west-2",
      aws_user_pools_id: "eu-west-2_aZQqQKAtg",
      aws_user_pools_web_client_id: "6mg2ndtf5qrv7gqaei46v3ce0g",
      oauth: {
        // domain: "sonic-data-demo.auth.eu-west-2.amazoncognito.com",
        // scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        // redirectSignIn: 'http://localhost:3001/auth/signin/callback',
        // redirectSignOut: 'http://localhost:3001/auth/logout/callback',
        // responseType: 'code',
      },
    },
    arba: {
      aws_project_region: "us-east-1",
      aws_cognito_identity_pool_id:
        "us-east-1:d039d9a0-5f87-4657-9cb5-ddb84203606c",
      aws_cognito_region: "us-east-1",
      aws_user_pools_id: "us-east-1_16ANcIiGR",
      aws_user_pools_web_client_id: "4bv6knpf3hho8jpdc4964i4c1g",
      oauth: {},
    },
};

export const awsConfig =
  awsConfigs[
    process.env.REACT_APP_ENV === "production" ? "sonic" : "arba"
  ];
