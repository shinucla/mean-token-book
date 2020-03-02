
import 'dart:async';
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:my_token_book/model/AuthRoleModel.dart';
import 'package:my_token_book/screen/HomeScreen.dart';
import 'package:my_token_book/screen/LoginScreen.dart';
import 'package:my_token_book/screen/CreateFamilyScreen.dart';

import 'package:my_token_book/service/StorageService.dart';

/*
* void main was default without async;
* I put async so that I can call await for Future function to get FlutterSecureStorage value
*/
void main() async { 

  WidgetsFlutterBinding.ensureInitialized();
  
  var data = await StorageService.get().getUserJwt();

  runApp(MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => AuthRoleModel()),
      ],
      child: MaterialApp(
        home: Consumer<AuthRoleModel>(
          builder: (context, model, child) {

            if (null != data && null != data['user'] && null != data['jwt']) {
              model.setUserJwtWithoutNotifyListeners(data['user'], data['jwt']);
              data = null; // clear data to prevent setting user jwt again when refresh
            }

            switch (model.getAuthState()) {
              case AuthState.UNINITIALIZED:
              case AuthState.UNAUTHENTICATED:
              case AuthState.AUTHENTICATING:
              return LoginScreen(); break;
              case AuthState.AUTHENTICATED_WITH_FAMILY:
              return HomeScreen(); break;
              case AuthState.AUTHENTICATED_WITHOUT_FAMILY:
              return CreateFamilyScreen(); break;
            }
          }
        ),
      )
  ));
}
