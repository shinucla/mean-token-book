import 'dart:convert'; // for using jsonDecode()
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import './storage.service.dart';
import './server.service.dart';
import '../config/config.dart';

/*
 * 1) http.post => Future<http.Response> => responose.body : String
 * 2) jsonDecode: string to Object: Map<String, dynamic>  or [Map]
 * 3) jsonEncode: Object to string
 */
class AuthService {
  final _server = new ServerService();
  final _storage = new StorageService();
    
  getJwt() async {
    return await this._storage.getJwt();
  }

  getUser() async {
    return await this._storage.getUser();
  }

  isLoggedIn() async {
    Map user = await getUser();
    return null != user;
  }
  
  logout() async {
    await this._storage.delete('user');
    await this._storage.delete('jwt');
  }

  login(Map user) {
    return this._server
      .resolve('/api/user/login', user)
      .then((data) {
	Map user = data['user'];
        String jwt = data['jwt'];

        if (null != user && null != jwt) {
          user['jwt'] = jwt;

	  _storage.writeMap('user', user);
	  
	  return Future.value(user);

	} else {
	  return Future.value(null);
	}
      });
  }

  register(user) async {
    return await this._server
      .resolve('/api/user/signupParent', user)
      .then(this.login);
  }

  registerFamilyMember(user) {
    return this._server.resolve('/api/user/signupFamilyMember', user);
  }

  //updateUser(user) {
  //}
  
  //login() {
  //  var jwt = body['data']['jwt'];
  //  var base64 = jwt.split('.')[1].replaceAll('-', '+').replaceAll('_', '/');
  //  base64 = base64.padRight(base64.length + (4 - base64.length % 4) % 4, '='); // pading '=' so the len is multiple of 4
  //  var decode = Utf8Codec().fuse(Base64Codec()).decode(base64);
  //  var user = jsonDecode(decode);
  //  this._storage.storeKeyValue(Config.FSS_KEY_JWT, jwt);
  //  this._storage.storeKeyValue(Config.FSS_KEY_USER, jsonEncode(user));
  //}

}
