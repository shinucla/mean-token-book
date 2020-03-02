import 'dart:convert'; // for using jsonDecode()
import 'package:http/http.dart' as http;

import 'package:my_token_book/service/StorageService.dart';
import 'package:my_token_book/config/Config.dart';

class ServerService {
  final _storage = StorageService.get();

  /* i.e. ServerService().resolve('/api/user/login', { username:xxx, password:yyy }) .... */
  resolve(controllerPath, json) async {
    String jwt = await this._storage.getJwt();
    Map<String, String> headers = { 'jwt' : jwt };

    return await http
    .post('${Config.APP_SERVER_DOMAIN}${controllerPath}', headers: headers, body: json)
    .then((response) {
        Map body = jsonDecode(response.body);

        if (200 == response.statusCode) {
          var data = body['data'];
          return Future.value(data);

        } else {
          throw body['error'];
        }
    })
    .catchError((err) {
        throw err;
    })
    ;
  }
}
