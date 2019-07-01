export default class User {
  id: Number;
  username: String;
  email: String;
  password: String;

  constructor(id: Number, username: String, email: String, password: String) {
    this.id = id
    this.username = username;
    this.email = email;
    this.password = password;
  }

  getUsername() {
    return this.username;
  }
}