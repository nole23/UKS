export class UserRegistration {
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    aggainPassword: String;
  static changePassword: any;

    constructor() {}

    /**
     * Change first and seccond type password
     * @param firstPass 
     * @param seccondPass 
     */
    changePassword(firstPass: String, seccondPass: String) {
        console.log(this.firstName)
        return firstPass === seccondPass;
    }
}
