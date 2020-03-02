import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:my_token_book/model/AuthRoleModel.dart';
import 'package:my_token_book/service/UserRepository.dart';

class CreateFamilyScreen extends StatefulWidget {
  @override
  _State createState() => _State();
}

class _State extends State<CreateFamilyScreen> {
  TextEditingController _familyname = TextEditingController(text: '');
  final _formKey = GlobalKey<FormState>();
  final _key = GlobalKey<ScaffoldState>();

  @override
  void initState() { super.initState(); }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _key,
      appBar: AppBar(
        title: Text("Setup Family"),
      ),
      body: Form(
        key: _formKey,
        child: Center(
          child: ListView(
            shrinkWrap: true,
            children: [
              FamilyNameInput(_familyname),
              SubmitButton((authrole) async {
                  if (_formKey.currentState.validate()) {
                    UserRepository().createFamily(authrole, { 'title': _familyname.text });

                  } else {
                    _key.currentState.showSnackBar(SnackBar(
                        content: Text("Something is wrong"),
                    ));
                  }
              }),
              ErrorMessageText(),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _familyname.dispose();
    super.dispose();
  }
}

// ------------------------------------------------------------

class FamilyNameInput extends StatelessWidget {
  TextEditingController _controller;

  FamilyNameInput(TextEditingController controlller) {
    this._controller = controlller;
  }

  @override
  Widget build(context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: TextFormField(
        controller: _controller,
        validator: (value) => (value.isEmpty) ? "Please enter a name for your family" : null,
        style: TextStyle(fontFamily: 'Montserrat', fontSize: 20.0),
        decoration: InputDecoration(
          prefixIcon: Icon(Icons.group),
          labelText: "Family Name",
          border: OutlineInputBorder()),
      ),
    );
  }
}

// ------------------------------------------------------------

class SubmitButton extends StatelessWidget {
  var _onClick;

  SubmitButton(onClick) {
    this._onClick = onClick;
  }

  @override
  Widget build(context) {
    final authrole = Provider.of<AuthRoleModel>(context, listen: false);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: Material(
        elevation: 5.0,
        borderRadius: BorderRadius.circular(30.0),
        color: Colors.red,
        child: MaterialButton(
          child: Text("Create", style: TextStyle(fontFamily: 'Montserrat', fontSize: 20.0, color: Colors.white, fontWeight: FontWeight.bold)),
          onPressed: ()=>_onClick(authrole),
        ),
      ),
    );
  }
}

// ------------------------------------------------------------

class ErrorMessageText extends StatelessWidget {
  @override
  Widget build(context) {
    String error = '';
    if (AuthState.AUTHENTICATED_WITH_FAMILY != Provider.of<AuthRoleModel>(context, listen: false).getAuthState()) {
      error = 'Please try a different name';
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 20.0, horizontal: 16.0),
      child: Center(
        child: Text(error, style: TextStyle(fontFamily: 'Montserrat', fontSize: 20.0, color: Colors.red, fontWeight: FontWeight.bold))),
    );
  }
}
