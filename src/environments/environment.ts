// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// You can paste config from:
// FIREBASE CONSOLE / PROJECT SETTINGS / YOUR APPLICATIONS / ADD APPLICATION
export const environment = {
  production: false,
  entryRoute: 'getting-started',
  candidateRoute: 'candidate',  
  workTrackerRoute: 'work-tracker',
  firebaseConfig: {
    appId: '855666881580',
    apiKey: 'AIzaSyBKe7rz6mjD8TdhsCvc6qkJbauAN6tryPo',
    authDomain: 'leanitgit.github.io',
    databaseURL: 'https://leanitdbstore.firebaseio.com',
    projectId: 'leanitdbstore',
    storageBucket: 'gs://leanitdbstore.appspot.com',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};

// export const environment = {
//   production: false,
//   entryRoute: 'getting-started',
//   firebaseConfig: {
//     projectId: "leanitdbstore2",
//     appId: "1:341837175742:web:07c414091fd7744804f7ef",
//     databaseURL: "https://leanitdbstore2.firebaseio.com",
//     storageBucket: "leanitdbstore2.appspot.com",
//     locationId: "us-central",
//     apiKey: "AIzaSyDwpHY59bgwoCNjlT6K5J1SW3EZ2cJaclg",
//     authDomain: "leanitdbstore2.firebaseapp.com",
//     messagingSenderId: "341837175742",
//     measurementId: "G-9DV46Z4N3Q"
//   }
  
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
