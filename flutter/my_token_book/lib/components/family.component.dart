import 'package:flutter/material.dart';
import '../repositories/user.repository.dart';

class FamilyComponent extends StatelessWidget {
  FamilyComponent({ Key key }) : super(key: key);

  @override
  Widget build(BuildContext context) => ListView(
    padding: const EdgeInsets.all(8.0),
    children: <Widget>[
      Container(child: new Content())
    ]
  );
}


class Content extends StatelessWidget {
  Content({ Key key }) : super( key: key) {
    // test
    var rtn = new UserRepository().getChildren();
    print(rtn);
  }

  @override
  Widget build(BuildContext context) => Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text('Family')
      ]
    ));
}
