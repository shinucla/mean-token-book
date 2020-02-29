import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:my_token_book/model/AuthRoleModel.dart';
import 'package:my_token_book/screen/HomeScreen.dart';
import 'package:my_token_book/screen/LoginScreen.dart';


void main() {
  runApp(MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => AuthRoleModel()),
      ],
      child: MaterialApp(
        home: Consumer<AuthRoleModel>(
          builder: (context, model, child) {
            switch (model.getAuthState()) {
              case AuthState.UNINITIALIZED:
              case AuthState.UNAUTHENTICATED:
              case AuthState.AUTHENTICATING:
              return LoginScreen();
              case AuthState.AUTHENTICATED:
              return HomeScreen();
            }
          }
        ),
      )
  ));
}

