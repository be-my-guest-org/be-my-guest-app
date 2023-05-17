//import AMPLIFY_CONFIG_PROD from './src/constants/Amplify-prod';
//import AMPLIFY_CONFIG from './src/constants/Amplify';

const AMPLIFY_CONFIG = {
  Auth: {

      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      //identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

      // REQUIRED - Amazon Cognito Region
      region: 'eu-central-1',

      // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
      // Required only if it's different from Amazon Cognito Region
      //identityPoolRegion: 'XX-XXXX-X',

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'eu-central-1_t6HRGS7ml',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '106ao2hnpdjljbgl2etdf3dvmq',

      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      //mandatorySignIn: false,

      // OPTIONAL - Configuration for cookie storage
      // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
      /*cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
          domain: '.yourdomain.com',
      // OPTIONAL - Cookie path
          path: '/',
      // OPTIONAL - Cookie expiration in days
          expires: 365,
      // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
          sameSite: "strict" | "lax",
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
          secure: true
      },

      // OPTIONAL - customized storage object
      //storage: MyStorage,

      // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
      authenticationFlowType: 'USER_PASSWORD_AUTH',

      // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
      clientMetadata: { myCustomKey: 'myCustomValue' },
*/

      // OPTIONAL - Hosted UI configuration
      oauth: {
          domain: 'be-my-guest.auth.eu-central-1.amazoncognito.com',
          scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
          //redirectSignIn: "https://www.example.com/cb",
          //redirectSignOut: "https://www.example.com/signout",
          //redirectSignIn: 'exp://127.0.0.1:19000/--/', // ok in DEV (only windows simulator)
          redirectSignIn: 'exp://192.168.0.102:19000/--/',// ok in DEV (both windows simulator and in phone)
          redirectSignOut: 'exp://192.168.0.102:19000/--/',
          responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
          pkce: true
      }
  }
};

const AMPLIFY_CONFIG_PROD = {
  Auth: {

      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      //identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

      // REQUIRED - Amazon Cognito Region
      region: 'eu-central-1',

      // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
      // Required only if it's different from Amazon Cognito Region
      //identityPoolRegion: 'XX-XXXX-X',

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'eu-central-1_vaGcV99Zw',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '3965gsiegkj9hir9plg9ki0shj',

      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      //mandatorySignIn: false,

      // OPTIONAL - Configuration for cookie storage
      // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
      /*cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
          domain: '.yourdomain.com',
      // OPTIONAL - Cookie path
          path: '/',
      // OPTIONAL - Cookie expiration in days
          expires: 365,
      // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
          sameSite: "strict" | "lax",
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
          secure: true
      },

      // OPTIONAL - customized storage object
      //storage: MyStorage,

      // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
      authenticationFlowType: 'USER_PASSWORD_AUTH',

      // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
      clientMetadata: { myCustomKey: 'myCustomValue' },
*/

      // OPTIONAL - Hosted UI configuration
      oauth: {
          domain: 'be-my-guest.auth.eu-central-1.amazoncognito.com',
          scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
          //redirectSignIn: "https://www.example.com/cb",
          //redirectSignOut: "https://www.example.com/signout",
          //redirectSignIn: 'exp://127.0.0.1:19000/--/', // ok in DEV (only windows simulator)
          redirectSignIn: 'exp://192.168.0.102:19000/--/',// ok in DEV (both windows simulator and in phone)
          redirectSignOut: 'exp://192.168.0.102:19000/--/',
          responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
          pkce: true
      }
  }
};

module.exports = {
  // All values in extra will be passed to your app.
  extra: {
    fact: 'kittens are cool',
    env: process.env.MY_ENVIRONMENT === 'prod' ? {
        amplifyConfig: AMPLIFY_CONFIG_PROD
    } : {
        amplifyConfig: AMPLIFY_CONFIG_PROD
    }
  },
};