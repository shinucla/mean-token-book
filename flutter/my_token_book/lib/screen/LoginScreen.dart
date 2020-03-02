import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:my_token_book/model/AuthRoleModel.dart';
import 'package:my_token_book/service/UserRepository.dart';

class LoginScreen extends StatefulWidget {
  @override
  _ScreenState createState() => _ScreenState();
}

class _ScreenState extends State<LoginScreen> {
  TextEditingController _username = TextEditingController(text: "");
  TextEditingController _password = TextEditingController(text: "");
  final _formKey = GlobalKey<FormState>();
  final _key = GlobalKey<ScaffoldState>();

  @override
  void initState() { super.initState(); }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _key,
      appBar: AppBar(
        title: Text("Login"),
      ),
      body: Form(
        key: _formKey,
        child: Center(
          child: ListView(
            shrinkWrap: true,
            children: [

              UsernameInput(_username),

              PasswordInput(_password),

              SignInButton((authrole) async {
                  if (_formKey.currentState.validate()) {
                    UserRepository().login(authrole, { 'username': _username.text, 'password': _password.text});

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
    _username.dispose();
    _password.dispose();
    super.dispose();
  }
}

// ------------------------------------------------------------

class UsernameInput extends StatelessWidget {
  TextEditingController _controller;

  UsernameInput(TextEditingController controlller) {
    this._controller = controlller;
  }

  @override
  Widget build(context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: TextFormField(
        controller: _controller,
        validator: (value) => (value.isEmpty) ? "Please Enter Username or Email" : null,
        style: TextStyle(fontFamily: 'Montserrat', fontSize: 20.0),
        decoration: InputDecoration(
          prefixIcon: Icon(Icons.person_pin),
          labelText: "Username",
          border: OutlineInputBorder()),
      ),
    );
  }
}

// ------------------------------------------------------------

class PasswordInput extends StatelessWidget {
  TextEditingController _controller;

  PasswordInput(TextEditingController controlller) {
    this._controller = controlller;
  }

  @override
  Widget build(context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: TextFormField(
        controller: _controller,
        validator: (value) => (value.isEmpty) ? "Please Enter Password" : null,
        obscureText: true,
        style: TextStyle(fontFamily: 'Montserrat', fontSize: 20.0),
        decoration: InputDecoration(
          prefixIcon: Icon(Icons.lock),
          labelText: "Password",
          border: OutlineInputBorder()),
      ),
    );
  }
}

// ------------------------------------------------------------

class SignInButton extends StatelessWidget {
  var _onLogin;

  SignInButton(onLogin) {
    this._onLogin = onLogin;
  }

  @override
  Widget build(context) {
    final authrole = Provider.of<AuthRoleModel>(context, listen: false);

    if (AuthState.AUTHENTICATING == authrole.getAuthState()) {
      return Center(child: CircularProgressIndicator());

    } else {
      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: Material(
          elevation: 5.0,
          borderRadius: BorderRadius.circular(30.0),
          color: Colors.red,
          child: MaterialButton(
            child: Text("Sign In", style: TextStyle(fontFamily: 'Montserrat', fontSize: 20.0, color: Colors.white, fontWeight: FontWeight.bold)),
            onPressed: ()=>_onLogin(authrole),
          ),
        ),
      );
    }
  }
}

// ------------------------------------------------------------

class ErrorMessageText extends StatelessWidget {
  @override
  Widget build(context) {
    String error = '';
    if (AuthState.UNAUTHENTICATED == Provider.of<AuthRoleModel>(context, listen: false).getAuthState()) {
      error = 'Login failed, please try again!';
    }
    
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 20.0, horizontal: 16.0),
      child: Center(
        child: Text(error, style: TextStyle(fontFamily: 'Montserrat', fontSize: 20.0, color: Colors.red, fontWeight: FontWeight.bold))),
    );
  }
}
