
@JsonSerializable()
class UserModel {
  int id;
  int familyId;
  String username;
  String email;
  String firstName;
  String lastName;
  int birthDate;
  int status;
  int roleId;

  String password;
  String jwt;
  
  UserModel.fromJson(Map<String, dynamic> json) :
  id = json['user']['id'],
  familyId = json['user']['family_id'],
  username = json['user']['username'],
  email = json['user']['email'],
  firstName = json['user']['first_name'],
  lastName = json['user']['last_name'],
  birthDate = json['user']['birth_date'],
  status = json['user']['status'],
  roleId = json['user']['role_id'],
  jwt = json['jwt'],
  ;

  Map<String, dynamic> toJson() =>
  {
    'username': username,
    'email': email,
    'password': password,
  };
}
