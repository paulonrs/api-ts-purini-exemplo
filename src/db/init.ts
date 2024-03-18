import User  from '../models/user/userModel'

const dbInit = () => {
  User.initUserModel();
}

export default dbInit 