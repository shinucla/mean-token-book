import 'package:http/http.dart' as http;
import './server-call.interceptor.dart';

class ServerService {

  ServerService();

  resolve(url, json) {
    return http.post(url, body: json);
  }
}
