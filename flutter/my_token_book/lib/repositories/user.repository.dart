import 'package:http/http.dart' as http;
import 'package:geolocation/geolocation.dart';

/*
 * Repository as singleton
 */
class UserRepository {
  static final http.client httpClient;
  static final UserRepository _repo = new UserPepository._internal();

  static UserRepository get() { return _repo; }

  UserRepository._internal() {
    //httpClient =
  }



  UserRepository({ this.httpClient });

  //Future<
}
