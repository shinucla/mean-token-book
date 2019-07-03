import 'package:flutter/material.dart';
import './components/main_page.component.dart';

void main() {
  runApp(new MaterialApp(
    home: MainPageComponent(title: 'My Token Book'),
    theme: ThemeData(
      primarySwatch: Colors.green,
    )
  ));
}
