import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:my_token_book/model/AuthRoleModel.dart';
import 'package:my_token_book/service/UserRepository.dart';

class SettingsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      appBar: AppBar(
        title: Text("Settings"),
      ),
      body: Center(
        child: RaisedButton(
          child: Text('Logout'),
          onPressed: () {
            UserRepository().logout(Provider.of<AuthRoleModel>(context, listen: false));
            
            Navigator.pop(context);
          }
        ),
      )
    );
  }
}
