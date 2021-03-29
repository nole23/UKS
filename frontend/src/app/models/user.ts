export class UserRegistration {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  aggainPassword: String;
  static changePassword: any;

  constructor() { }

  /**
   * Change first and seccond type password
   * @param firstPass 
   * @param seccondPass 
   */
  changePassword(firstPass: String, seccondPass: String) {
    return firstPass === seccondPass;
  }
}

export class User {
  id: any;
  firstName: String;
  lastName: String;
  username: String;

  constructor(item: any) {
    this.id = item.id;
    this.firstName = item.firstName;
    this.lastName = item.lastName;
    this.username = item.username;
  }
}
