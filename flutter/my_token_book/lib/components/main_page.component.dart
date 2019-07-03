import 'package:flutter/material.dart';
import './home.component.dart';

class MainPageComponent extends StatefulWidget {
  // super class with contructor takes an optional parameter: key (type of Key)
  MainPageComponent({ Key key, this.title }) : super(key: key);

  final String title;

  @override
  _ComponentState createState() => _ComponentState();
}

class _ComponentState extends State<MainPageComponent> {
  int _counter = 0;
  int _bottomNavIndex = 0;

  @override
  Widget build(BuildContext context) {
    
    return Scaffold(

      appBar: AppBar(
        title: Text(widget.title) // widget: for referencing parent widget
      ),

      body: new HomeComponent( counter: _counter ),

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
	  //this._counter+=index;
	  //this._bottomNavIndex = index;
	  //setState(() {});
	  setState(() {
	    this._counter+=index;
	    this._bottomNavIndex = index;
	  });
        },
        
      ),
      
    );

  }

  void _incrementCounter() {
    //setState(() {
    //  _counter++;
    //});

    setState(() => _counter++);
  }

}
