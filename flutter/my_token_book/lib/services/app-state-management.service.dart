import 'package:provider/provider.dart';
import './auth.service.dart';

/*
 * First Things First, our app may be any of these four states:
 *   1) UNINITIALIZED: ---- show splash screen 
 *   2) UNAUTHENTICATED: - show login screen
 *   3) AUTHENTICATING: --- show progressscreen
 *   4) AUTHENTICATED: ---- checking role status
 * 
 * And once it is Authenticated, it could have following role status
 *   1) PARENT / ADMIN ---- checking family status
 *   2) CHILD ------------- must have family already, so, home page
 *
 * family status
 *   1) INCOMPLETED ------- show creating family screen
 *   2) COMPLETED --------- |- show full nav for parent
 *                          |- show home/dash only for child
 *
 *
 */

enum AuthStatus { UNINITIALIZED, UNAUTHENTICATED, AUTHENTICATING, AUTHENTICATED }
enum FamilyStatus { INCOMPLETE, COMPLETED }
enum RoleStatus { NOT_SET, PARENT, CHILD, ADMIN }

enum RoleEnum { PARENT: 1, CHILD: 2, ADMIN: 4 }

/* will be instantiated @ builder function of change notifier provider */
class AppStateChangeNotifier extends ChangeNotifier {
  AuthService _auth = new AuthService();
  AuthStatus _authStatus = AuthStatus.UNINITIALIZED;
  FamilyStatus _familyStatus = FamilyStatus.INCOMPLETE;
  RoleStatus _roleStatus = RoleStatus.NOT_SET;
  
  AuthStatus get authStatus => _authStatus;
  FamilyStatus get familyStatus => _familyStatus;
  RoleStatus get roleStatus => _roleStatus;

  Future<Map> login(username, password) async {
    try {
      _authStatus = AuthStatus.AUTHENTICATING;
      notifyListeners();
      
      await _auth.login({ 'username': username, 'password': password });
      var user = await _auth.getUser();

      if (null != user) {
	_authStatus = AuthStatus.AUTHENTICATED;

	if (null != user['family_id']) {
	  _familyStatus = FamilyStatus.COMPLETED;
	}
	
	if (null != user['role_id'] && (0 < RoleEnum.PARENT & user['role_id'])) {
	  _roleStatus = RoleStatus.PARENT;

	} else if (null != user['role_id'] && (0 < RoleEnum.ADMIN & user['role_id'])) {
	  _roleStatus = RoleStatus.ADMIN;

	} else if (null != user['role_id'] && (0 < RoleEnum.CHILD & user['role_id'])) {
	  _roleStatus = RoleStatus.CIHLD;
	}

	notifyListeners();

      } else {
	_authStatus = AuthStatus.AUTHENTICATED;
	notifyListeners();
      }
      
      return user;

    } catch (e) {
      _authStatus = AuthStatus.UNAUTHENTICATED;
      notifyListeners();
      return null;
    }
  }

  void logout() async {
    await _auth.logout();
    _authStatus = AuthStatus.UNAUTHENTICATED;
    notifyListeners();
  }
  
}
