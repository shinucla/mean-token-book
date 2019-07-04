import 'package:flutter/material.dart';
import '../repositories/user.repository.dart';

import 'package:http/http.dart' as http;

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
    new UserRepository().getChildren((data) => print(data.body));

    //this.doit();
  }

  void doit() async {
    var res = await http.post('https://mytokenbook.com/api/user/getChildren', body: {});
    print(res.body);
    print(res.statusCode);
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
