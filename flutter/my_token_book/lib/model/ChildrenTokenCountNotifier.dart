import 'package:flutter/foundation.dart';
import 'package:provider/provider.dart';
import 'package:json_annotation/json_annotation.dart';

class ChildrenTokenCountNotifier extends ChangeNotifier {
  var _childrenTokenCounts = [];
  
  getChildrenTokenCounts() { return this._childrenTokenCounts; }
  
  setChildrenTokenCountsWithoutNotifyListeners(data) {
    this._childrenTokenCounts = data;

    notifyListeners();
  }
}
