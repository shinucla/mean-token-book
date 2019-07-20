import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './screens/main-page.screen.dart';

void main() {
  runApp(new MaterialApp(
    home: new MainPageScreen(title: 'My Token Book'),
    theme: ThemeData(
      primarySwatch: Colors.green,
    )
  ));
}







/*
 * First Things First, our app may be any of these four states:
 * 1) Uninitialized: ---- show splash screen
 * 2) Un-authenticated: - show login screen
 * 3) Authenticating: --- show progressscreen
 * 4) Authenticated: ---- show home screen
 */
class AuthChangeNotifier extends ChangeNotifier {
  var _user;
  var _jwt;

  getUser() { return _user; }
  getJwt() { return _jwt; }

  void loginSuccessfully(user) {
    _user = user;
    _jwt = user.jwt;

    notifyListeners();
  }

  void loginFailed() {


    notifyListeners();
  }
}
