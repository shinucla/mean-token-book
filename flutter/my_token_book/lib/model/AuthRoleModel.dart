import 'package:flutter/foundation.dart';
import 'package:provider/provider.dart';


/*
 * Using provider for state management:
 *  We need three things for using provider as state management:
 *  1) ChangeNotifier
 *      - model that extends ChangeNotifier;
 *      - provided a method: notifyListenders(), which should be called when things changed
 *  2) ChangeNotifierProvider
 *     A widget with constructor that takes two input:
 *     - builder: function returns the change notifier model, in turn, will inject the model instance into context,
 *                so it can be accessed later in the child widget's builder context via either: Consumer widget or Provider.of func
 *     - child: the child widget
 *  3) Consumer or Provider.of<class type>(builder context from change notifier provider
 *     A widget with constructor that takes one input:
 *     - builder: (context, notifierModel, child) => { ... }
 *     this builder function will be automatically called whenever the notifier changes and called (notifyListeners())
 *
 * Our app may be any of these four auth states:
 * 1) Uninitialized: ---- show splash screen
 * 2) Un-authenticated: - show login screen
 * 3) Authenticating: --- show progress screen
 * 4) Authenticated: ---- show home screen
 *
 * And it may be any of these 4 states for role states:
 * 1) Uninitialized ----- only accessible to login screen and splash screen and progress screen
 * 2) Parent ------------ full access to all views
 * 3) Child ------------- only accessible to home and dashboard views
 * 4) Admin ------------- full access to all views
 */

enum AuthState { UNINITIALIZED, UNAUTHENTICATED, AUTHENTICATING, AUTHENTICATED }
enum RoleState { UNINITIALIZED, PARENT, CHILD, ADMIN }
/* roles: 1 = parent, 2 = child, 4 = admin */

class AuthRoleModel extends ChangeNotifier {
  var _user = null;
  var _jwt = null;
  var _authState = AuthState.UNINITIALIZED;
  var _roleState = RoleState.UNINITIALIZED;

  getUser() { return this._user; }
  getJwt() { return this._jwt; }
  getAuthState() { return this._authState; }
  getRoleState() { return this._roleState; }

  login(user) {
    this._user = user;
    this._jwt = user.jwt;

    if (null != user && null != user.jwt) {
      this._authState = AuthState.AUTHENTICATED;
    }

    if (null != user.role) {
      switch (user.role) {
        case 1: this._roleState = RoleState.PARENT; break;
        case 2: this._roleState = RoleState.CHILD; break;
        case 4: this._roleState = RoleState.ADMIN; break;
      }
    }

    notifyListeners();
  }

  logout() {
    this._user = null;
    this._jwt = null;
    this._authState = AuthState.UNAUTHENTICATED;
    this._roleState = RoleState.UNINITIALIZED;

    notifyListeners();
  }

  loginFailed() {
    this._authState = AuthState.UNAUTHENTICATED;
    this._roleState = RoleState.UNINITIALIZED;

    notifyListeners();
  }

  authenticating() {
    this._authState = AuthState.AUTHENTICATING;

    notifyListeners();
  }

  setAuthState(AuthState state) {
    this._authState = state;

    notifyListeners();
  }

  setRoleState(RoleState state) {
    this._roleState = state;

    notifyListeners();
  }
}
