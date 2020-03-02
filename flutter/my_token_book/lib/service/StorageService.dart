import 'dart:convert'; // for using jsonDecode()
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'package:my_token_book/config/Config.dart';

/*
 * 1) http.post => Future<http.Response> => responose.body : String
 * 2) jsonDecode: string to Object: Map<String, dynamic>  or [Map]
 * 3) jsonEncode: Object to string
 *
 * TBI: 4) Storage Service should be singleton
 *
 */
class StorageService {
  static final _instance = new StorageService._internal();
  
  static StorageService get() {
    return _instance;
  }
  
  factory StorageService() {
    return _instance;
  }
  
  // ------------------------------------------------------------

  final _storage = new FlutterSecureStorage();

  StorageService._internal() { } // internel constructor

  getJwt() async {
    String str = await this._storage.read(key: Config.FSS_KEY_JWT);

    if (str.startsWith('"') && str.endsWith('"')) {
      str = str.substring(1, str.length - 1);
    }
      
    return str;
  }
  
  getUser() async {
    var data = await this._storage.read(key: Config.FSS_KEY_USER);
    return (null == data
	    ? null
	    : jsonDecode(data));
  }

  getUserJwt() async {
    var data = {};
    var userstring = await this._storage.read(key: Config.FSS_KEY_USER); // Please jsonDecode this at main.dart
    data['jwt'] = await this._storage.read(key: Config.FSS_KEY_JWT);
    data['user'] = null == userstring ? null : jsonDecode(userstring);

    return data;
  }

  saveUserJwt(data) async {
    await this._storage.write(key: Config.FSS_KEY_USER, value: jsonEncode(data['user']));
    await this._storage.write(key: Config.FSS_KEY_JWT, value: data['jwt']);
  }

  read(String key) async {
    return await this._storage.read(key: key);
  }
  
  void write(String key, String value) async {
    await this._storage.write(key: key, value: value);
  }

  void writeMap(String key, Map value) async {
    await this._storage.write(key: key, value: jsonEncode(value));
  }
  
  void delete(String key) async {
    await this._storage.delete(key: key);
  }
}
