var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","component":"LoginComponent"},{"path":"login","component":"LoginComponent"},{"path":"validate-code","component":"ValidateCodeComponent"},{"path":"forgot-password","component":"ForgotPasswordComponent"},{"path":"reset-password","component":"ResetPasswordComponent","canActivate":["RolguardGuard"],"data":{"expectedRole":["ROLE_ADMIN","ROLE_CNOC","ROLE_PROVE","ROLE_CORP"]}},{"path":"dashboard","loadChildren":"dashboardModule"},{"path":"**","component":"NotFoundPageComponent"}],"kind":"module"}]}
