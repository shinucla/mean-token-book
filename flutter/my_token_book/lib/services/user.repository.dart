import './server.service.dart';

class UserRepository {
  getChildren() {
    return ServerService().resolve('/api/user/getChildren', {});
  }

  getFamilyMembers() {
    return ServerService().resolve('/api/user/getFamilyMembers', {});
  }

  createFamily(json) {
    return ServerService().resolve('/api/user/createFamily', json);
  }
}
