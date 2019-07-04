import 'package:http/http.dart' as http;
import './server-call.interceptor.dart';

class ServerService {

  Client httpClient = HttpClientWithInterceptor.build(interceptors: [
    new ServerCallInterceptor(),
  ]);

  resolve({ @required String url, json }) async {
    // try catch?
    return await this.httpClient.post(url, body: json);
  }
}
