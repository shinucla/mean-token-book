import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/auth-role.change-notifier.dart';

import './splash.screen.dart';
import './authenticating.screen.dart';
import './home.screen.dart';
import './dashboard.screen.dart';
import './family.screen.dart';
import './category.screen.dart';
import './login.screen.dart';

class MainPageScreen extends StatefulWidget {
  final String title;

  MainPageScreen({ Key key, this.title }) : super(key: key);

  @override
  _ScreenState createState() => new _ScreenState();
}

class _ScreenState extends State<MainPageScreen> {
  int _bottomNavIndex = 0;

  @override
  Widget build(BuildContext context) {
    var authrole = Provider.of<AuthRoleChangeNotifier>(context);

    if (AuthState.UNINITIALIZED == authrole.getAuthState()) {
      return SplashScreen();

    } else if (AuthState.UNAUTHENTICATED == authrole.getAuthState()) {
      return LoginScreen();

    } else if (AuthState.AUTHENTICATED == authrole.getAuthState()) {
      return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text(widget.title) // widget: for referencing parent widget
        ),

        body: _getScreen(authrole, this._bottomNavIndex),

        bottomNavigationBar: new BottomNavigationBar(
          currentIndex: this._bottomNavIndex,
          type: BottomNavigationBarType.fixed,
          items: _getNavItems(authrole),
          onTap: (int index) {
            setState(() {
              this._bottomNavIndex = index;
            });
          },
        ),
      );
    }
  }

  Widget _getScreen(AuthRoleChangeNotifier authrole, int index) {
    switch (authrole.getAuthState()) {
      case AuthState.UNINITIALIZED: return new SplashScreen();
      case AuthState.AUTHENTICATING: return new AuthenticatingScreen();
      case AuthState.UNAUTHENTICATED: return new LoginScreen();
      case AuthState.AUTHENTICATED: return _getAuthenticatedScreen(index);
    }
  }

  Widget _getAuthenticatedScreen(int index) {
    switch (index) {
      case 0: return new HomeScreen( counter: 123 );
      case 1: return new DashboardScreen();
      case 2: return new FamilyScreen();
      case 3: return new CategoryScreen();
      default: return new HomeScreen( counter: 321 );
    }
  }

  _getNavItems(AuthRoleChangeNotifier authrole) {
    return [
      BottomNavigationBarItem(
        title: Text('Home'),
        icon: Icon(Icons.home)
      ),
      BottomNavigationBarItem(
        backgroundColor: Colors.black,
        title: Text('Dashboard'),
        icon: Icon(Icons.list)
      ),
      BottomNavigationBarItem(
        title: Text('Family'),
        icon: Icon(Icons.people)
      ),
      BottomNavigationBarItem(
        title: Text('Category'),
        icon: Icon(Icons.category)
      )];
  }
}
