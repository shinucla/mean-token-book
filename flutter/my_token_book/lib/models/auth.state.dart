import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class AAuthEvent extends Equatable {
  AAuthEvent([List props = const []]) : super(props);
}

class AuthEvent {

  class Login extends AAuthEvent {
  }
}
