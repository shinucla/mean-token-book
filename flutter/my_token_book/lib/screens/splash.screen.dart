import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:async';

import '../models/auth-role.change-notifier.dart';

class SplashScreen extends StatefulWidget {

  @override
  _ScreenState createState() => _ScreenState();
}

class _ScreenState extends State<SplashScreen> {
  AuthRoleChangeNotifier _authrole;
  
  @override
  void initState() {
    super.initState();
    startTimer();
  }
  
  @override
  build(BuildContext context) {
    var authrole = Provider.of<AuthRoleChangeNotifier>(context);

    setState(() {
      this._authrole = authrole;
    });
	     
    return Container(
      color: Colors.green,
      alignment: FractionalOffset.center,
      child: new Image.asset('assets/sharkla.png', fit: BoxFit.fill)
    );
  }
  
  startTimer() async {
    var _time = new Duration(seconds: 5);
    return new Timer(_time, stopSplashScreen);
  }

  void stopSplashScreen() {
    this._authrole.logout();
  }
}
