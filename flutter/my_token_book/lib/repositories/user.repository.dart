import 'package:http/http.dart' as http;
//import 'package:geolocation/geolocation.dart';
import './server.service.dart';

/*
 * singleton might not be a good idea
 */
class UserRepository {

  static UserRepository get() { return new UserRepository(); }

  ServerService _server;

  UserRepository() {
    this._server = new ServerService();
  }

  getChildren(callback) {
    _server
      .resolve('https://mytokenbook.com/api/user/getChildren', {})
      .then(callback);
  }

  getFamilyMembers() {
    //return _server.resolve('/api/user/getFamilyMembers', body: {});
  }

  createFamily(json) {
    //return _server.resolve('/api/user/createFamily', body: json);
  }

}
