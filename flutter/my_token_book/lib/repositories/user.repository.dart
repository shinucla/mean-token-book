import 'package:http/http.dart' as http;
import 'package:geolocation/geolocation.dart';

/*
 * singleton might not be a good idea
 */
class UserRepository {

  static UserRepository get() { return new _UserRepository(); }

  UserRepository();

  getChildren() {
    return http.post('/api/user/getChildren', body: {});
  }

  getFamilyMembers() {
    return http.post('/api/user/getFamilyMembers', body: {});
  }

  createFamily(json) {
    return http.post('/api/user/createFamily', body: json);
  }

}
