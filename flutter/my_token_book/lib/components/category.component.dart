import 'package:flutter/material.dart';

class CategoryComponent extends StatelessWidget {
  CategoryComponent({ Key key }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(8.0),
      children: <Widget>[
	Container(child: new Content())
      ]
    );
  }
}


class Content extends StatelessWidget {
  Content({ Key key }) : super( key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text('Categories')
        ]
      ));
  }
}
