import 'dart:async';
import 'dart:convert'; // for using jsonDecode()

import 'package:my_token_book/config/Config.dart';

import 'package:my_token_book/service/StorageService.dart';
import 'package:my_token_book/service/ServerService.dart';
import 'package:my_token_book/model/AuthRoleModel.dart';


class UserRepository {
  final _storage = StorageService.get();
  
  register(AuthRoleModel authrole, user) {
    new ServerService()
    .resolve('/api/user/signupParent', user)
    .then((data) {
        print(data);
    });
  }

  login(AuthRoleModel authrole, user) async {
    authrole.authenticating();

    await new Future.delayed(const Duration(seconds: 1));
    
    new ServerService()
    .resolve('/api/user/login', user)
    .then((data) {
        _storage.write(Config.FSS_KEY_USER, jsonEncode(data['user']));
        _storage.write(Config.FSS_KEY_JWT, jsonEncode(data['jwt']));
        authrole.login(data['user'], data['jwt']);
    })
    .catchError((err) {
        print(err);
        authrole.loginFailed();
    });
  }

  logout(AuthRoleModel authrole) async {
    await _storage.delete(Config.FSS_KEY_USER);
    authrole.logout();
  }
  
  getChildrenTokenCounts(AuthRoleModel authrole) {
    ServerService()
    .resolve('/api/token-event/getChildrenTokenCounts', {})
    .then((data) {
        authrole.setChildrenTokenCountsWithoutNotifyListeners(data);
    });
  }

  getFamilyMembers() {
    return ServerService().resolve('/api/user/getFamilyMembers', {});
  }

  createFamily(AuthRoleModel authrole, json) async {
    ServerService()
    .resolve('/api/user/createFamily', json)
    .then((data) async {
        var userjwt = await _storage.getUserJwt();
        userjwt['user']['family_id'] = data['id'];
        _storage.write(Config.FSS_KEY_USER, jsonEncode(userjwt['user']));
        
        authrole.login(userjwt['user'], userjwt['jwt']);
    })
    .catchError((err) {
        
    });
  }
}
