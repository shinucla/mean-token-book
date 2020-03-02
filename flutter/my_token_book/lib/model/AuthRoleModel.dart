import 'package:flutter/foundation.dart';
import 'package:provider/provider.dart';
import 'package:json_annotation/json_annotation.dart';

import 'package:my_token_book/service/StorageService.dart';

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

enum AuthState { UNINITIALIZED, UNAUTHENTICATED, AUTHENTICATING, AUTHENTICATED_WITHOUT_FAMILY, AUTHENTICATED_WITH_FAMILY }
enum RoleState { UNINITIALIZED, PARENT, CHILD, ADMIN }
/* roles: 1 = parent, 2 = child, 4 = admin */

@JsonSerializable()
class AuthRoleModel extends ChangeNotifier {
  var _user = null;
  var _jwt = null;
  var _authState = AuthState.UNINITIALIZED;
  var _roleState = RoleState.UNINITIALIZED;
  var _childrenTokenCounts = [];
  
  getUser() { return this._user; }
  getJwt() { return this._jwt; }
  getAuthState() { return this._authState; }
  getRoleState() { return this._roleState; }
  getChildrenTokenCounts() { return this._childrenTokenCounts; }
  
  //auth() {
  //  this._authState = AuthState.AUTHENTICATED;
  //  notifyListeners();
  //}
  
  //tryToLoadUserFromStorage() async {
  //  var data = await StorageService.get().getUserJwt();
  //
  //  print(data);
  //  
  //  if (null != data['user'] && null != data['jwt']) {
  //    setUserJwtWithoutNotifyListeners(data['user'], data['jwt']);
  //  }
  //}
  
  setUserJwtWithoutNotifyListeners(user, jwt) {
    this._user = user;
    this._jwt = jwt;

    if (null != user && null != jwt) {
      if (null != user['family_id']) {
        this._authState = AuthState.AUTHENTICATED_WITH_FAMILY;
      } else {
        this._authState = AuthState.AUTHENTICATED_WITHOUT_FAMILY;
      }
    }

    if (null != user['role_id']) {
      switch (user['role_id']) {
        case 1: this._roleState = RoleState.PARENT; break; // 0x0001
        case 2: this._roleState = RoleState.CHILD; break;  // 0x0010
        case 4: this._roleState = RoleState.ADMIN; break;  // 0x0100
        case 5: this._roleState = RoleState.ADMIN; break;  // 0x0101
      }
    }
  }
  
  login(user, jwt) {
    setUserJwtWithoutNotifyListeners(user, jwt);
    
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

  setChildrenTokenCountsWithoutNotifyListeners(data) {
    this._childrenTokenCounts = data;

    notifyListeners();
  }
}
