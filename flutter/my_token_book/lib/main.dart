import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './models/auth-role.change-notifier.dart';
import './screens/main-page.screen.dart';

void main() {
  runApp(new MaterialApp(

    home: new ChangeNotifierProvider(
      builder: (conext) => AuthRoleChangeNotifier(),
      child: new MainPageScreen(title: 'My Token Book')
    ),

    theme: ThemeData(
      primarySwatch: Colors.green,
    )
  ));
}
