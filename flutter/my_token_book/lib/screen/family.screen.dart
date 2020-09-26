import 'package:flutter/material.dart';
import '../services/user.repository.dart';
import '../services/auth.service.dart';

class FamilyScreen extends StatelessWidget {
  FamilyScreen({ Key key }) : super(key: key);

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
    doAsync();
  }

  void doAsync() async {
    var auth = new AuthService();

    if (await auth.isLoggedIn()) {
      print('logged in');
      print(await auth.getUser());

    } else {
      Map user = {};
      user['username'] = 'cchenzx';
      user['password'] = 'matrix';
      await auth.login(user).then((data) {
          print(data);
      });
    }
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
