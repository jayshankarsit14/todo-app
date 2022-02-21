
class AuthenticationService {
registerSuccessfulLogin(username,password){
    console.log("register success")
    sessionStorage.setItem('authenticatedUser',username);
}

logout(username){
    sessionStorage.removeItem('authenticatedUser',username);
}

isUserLoggedIn(){
    let user=sessionStorage.getItem('authenticatedUser');
    if(user===null) return false;
    return true;
}

getLoggedInUserName(){
    let user=sessionStorage.getItem('authenticatedUser');
    if(user===null) return '';
    return user;
}

}
export default new AuthenticationService();