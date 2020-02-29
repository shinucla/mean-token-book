import 'package:flutter/material.dart';

class CategoryScreen extends StatelessWidget {
  CategoryScreen({ Key key }) : super(key: key);

  @override
  Widget build(BuildContext context) => ListView(
    padding: const EdgeInsets.all(8.0),
    children: <Widget>[
      Container(child: new Content())
    ]
  );
}

class Content extends StatelessWidget {
  Content({ Key key }) : super( key: key);

  @override
  Widget build(BuildContext context) => Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text('Categories')
      ]
    )
  );
}
