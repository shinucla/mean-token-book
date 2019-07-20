import 'package:flutter/material.dart';
import './home.screen.dart';
import './dashboard.screen.dart';
import './family.screen.dart';
import './category.screen.dart';

class MainPageScreen extends StatefulWidget {
  // super class with contructor takes an optional parameter: key (type of Key)
  MainPageScreen({ Key key, this.title }) : super(key: key);

  final String title;

  @override
  _ScreenState createState() => new _ScreenState();
}

class _ScreenState extends State<MainPageScreen> {
  int _counter = 0;
  int _bottomNavIndex = 0;

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      centerTitle: true,
      title: Text(widget.title) // widget: for referencing parent widget
    ),

    body: _getScreen(this._bottomNavIndex),

    bottomNavigationBar: new BottomNavigationBar(
      currentIndex: this._bottomNavIndex,
      type: BottomNavigationBarType.fixed,
      items: [
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
        )],

      onTap: (int index) {
        setState(() {
          this._counter+=index;
          this._bottomNavIndex = index;
        });
      },
    ),

  );

  Widget _getScreen(int index) {
    switch (index) {
    case 0: return new HomeScreen( counter: this._counter );
    case 1: return new DashboardScreen();
    case 2: return new FamilyScreen();
    case 3: return new CategoryScreen();
    default: return new HomeScreen( counter: this._counter );
    }
  }

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

}
