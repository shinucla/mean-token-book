import 'dart:convert'; // for using jsonDecode()
import 'package:http/http.dart' as http;
import './storage.service.dart';
import '../config/config.dart';

class ServerService {
  final _storage = new StorageService();

  resolve(url, json) async {
    String jwt = await this._storage.getJwt();
    Map<String, String> header = { "jwt": "$jwt" };

    return await http
      .post('${Config.APP_SERVER_DOMAIN}${url}', headers: header, body: json)
      .then((response) {
        Map body = jsonDecode(response.body);

        if (200 == response.statusCode) {
	  var data = body['data'];
	  return Future.value(data);
	  
        } else {
	  throw body['error'];
        }
      })
    //.catchError((err) {
    //
    //  print('error received: ');
    //  print(err);
    //
    //  // TBI erro handle
    //})
    ;
  }
}
