```plaintext
From the course Angular and NodeJS: A Practical Guide with Typescript by Antonio Papa
https://www.udemy.com/course/angular-node-admin/
and
The Complete Angular & NestJS Course
https://www.udemy.com/course/the-complete-angular-nestjs-course/

Added my notes and every command used in the project, hope you find this useful in learning about Angular. :)

ng new angular-admin --skip-git
	-yes routing, css
	
ng g c nav
ng g c menu

ng g m public
ng g m secure

ng g c secure
ng g c public

ng g c public/login
ng g c public/register

// for api requests
ng g s services/auth

// DAO
// User has a role
//
ng g i interfaces/user
ng g i interfaces/role
ng g i interfaces/permission
ng g i interfaces/product
ng g i interfaces/order
ng g i interfaces/order-item

ng g interceptor interceptors/credential --skip-tests|--spec=false

ng g c secure/profile --skip-tests
ng g c secure/dashboard --skip-tests
ng g c secure/users --skip-tests
ng g c secure/users/user-create --skip-tests
ng g c secure/users/user-edit --skip-tests
ng g c secure/roles --skip-tests
ng g c secure/roles/role-create --skip-tests
ng g c secure/roles/role-edit --skip-tests
ng g c secure/products --skip-tests
ng g c secure/products/product-create --skip-tests
ng g c secure/products/product-edit --skip-tests
ng g c secure/components/paginator --skip-tests
ng g c secure/components/upload --skip-tests
ng g c secure/orders --skip-tests

ng g s services/user --skip-tests
ng g s services/role --skip-tests
ng g s services/rest --skip-tests
ng g s services/permission --skip-tests
ng g s services/product --skip-tests
ng g s services/order --skip-tests

---

To not generate test files (doesn't work: Data path "" must NOT have additional properties(skipTests).):
"@schematics/angular:component": {
  "skipTests": true
},
"@schematics/angular:module": {
  "skipTests": true
},
"@schematics/angular:service": {
  "skipTests": true
},

---
npm i c3
npm i -D @types/c3
---

---Angular Fixes

Fix: error TS2564: Property has no initializer and is not definitely assigned in the constructor.
tsconfig.json (under compilerOptions):
    "noImplicitReturns": false,
    "strictPropertyInitialization": false,
	
---Angular2+ Concepts

<router-outlet> => loads (child) components dynamically
	-master-detail

normal forms => 2 way data binding
reactive forms

generated services can be injected as a dependency in components

@Input - to pass variables from parent component to child component (via html attribute)
	-So only one component calls api once instead of multiple components calling the same api.
	
Interceptors => to do something additional for every request made. e.g. add credentials (cookies)

Event Emitter => Like redux/vuex to store global data (for component events to update other components)
	-Emit and Subscribe to an event
	-So only one component calls api once instead of multiple components calling the same thing.

[routerLink] vs routerLink
	-brackets means you pass in variable (dynamic)
	-w/o brackets means a string
	
(click/submit)
	-parentheses mean event, which will trigger/call a function.
	
<ng-container></ng-container> doesn't show as an html element
```
