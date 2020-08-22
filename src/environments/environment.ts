// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlSignup: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuhX9fSL604_aS04y_v42tB1EB2oO2F1c',
  urlLogin: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuhX9fSL604_aS04y_v42tB1EB2oO2F1c',
  urlRecipes: 'https://recipes-app-b4d95.firebaseio.com/recipes.json'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
