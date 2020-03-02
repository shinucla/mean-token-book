import 'dart:async';
import 'dart:convert'; // for using jsonDecode()

import 'package:my_token_book/service/ServerService.dart';
import 'package:my_token_book/model/AuthRoleModel.dart';

class TokenRepository {

  getTotalTokens(member) {
    return ServerService().resolve('/api/user/getFamilyMembers', {});
  }

  createFamily(json) {
    return ServerService().resolve('/api/user/createFamily', json);
  }
}
