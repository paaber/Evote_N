class User{

    constructor(user_mat_no,user_passcode){
        this.user_mat_no=user_mat_no;
        this.user_passcode = user_passcode
    }

    get userPasssCode(){
        return this.user_passcode;
    }
    
    checkUserAccredibility(user_passcode_db){
        if(user_passcode_db === this.userPasssCode()){
            return true
        }

    }
}
class Voters{


}