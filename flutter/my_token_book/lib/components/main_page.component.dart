import 'package:flutter/material.dart';
import './home.component.dart';
import './dashboard.component.dart';
import './family.component.dart';
import './category.component.dart';

class MainPageComponent extends StatefulWidget {
  // super class with contructor takes an optional parameter: key (type of Key)
  MainPageComponent({ Key key, this.title }) : super(key: key);

  final String title;

  @override
  _ComponentState createState() => new _ComponentState();
}

class _ComponentState extends State<MainPageComponent> {
  int _counter = 0;
  int _bottomNavIndex = 0;

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      centerTitle: true,
      title: Text(widget.title) // widget: for referencing parent widget
    ),

    body: _getScreenComponent(this._bottomNavIndex),

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

  Widget _getScreenComponent(int index) {
    switch (index) {
    case 0: return new HomeComponent( counter: this._counter );
    case 1: return new DashboardComponent();
    case 2: return new FamilyComponent();
    case 3: return new CategoryComponent();
    default: return new HomeComponent( counter: this._counter );
    }
  }

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

}
