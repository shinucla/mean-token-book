import 'package:equatable/equatable.dart';

abstract class AuthState extends Equatable {}

class AuthUninitialized extends AuthState {
  @override
  String toString() => 'AuthUninitialized';
}

class AuthLoggedIn extends AuthState {
  @override
  String toString() => 'AuthLoggedIn';
}

class AuthenLoggedOut extends AuthState {
  @override
  String toString() => 'AuthLoggedOut';
}

class AuthLoading extends AuthState {
  @override
  String toString() => 'AuthLoading';
}
