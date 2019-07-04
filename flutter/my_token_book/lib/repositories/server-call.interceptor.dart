import 'package:http/http.dart' as http;
import 'package:http_interceptor/http_interceptor.dart';

class ServerCallInterceptor implements InterceptorContract {
  @override
  Future<RequestData> interceptRequest({RequestData data}) async {
    print('http requesting...\r\n');
    return data;
  }

  @override
  Future<ResponseData> interceptResponse({ResponseData data}) async {
    print('http responding...\r\n');
    return data;
  }
}
