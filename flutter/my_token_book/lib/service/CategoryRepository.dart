import './server.service.dart';

class CategoryRepository {
  create(json) {
    return ServerService().resolve('/api/category/create', json);
  }

  update(json) {
    return ServerService().resolve('/api/category/update', json);
  }

  delete(json) {
    return ServerService().resolve('/api/category/delete', json);
  }

  getCategories() {
    return ServerService().resolve('/api/category/getCategories', {});
  }
}
