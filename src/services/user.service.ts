const Userr = require("../models/UserModel");
const bcryptEncrypter = require("bcrypt");

class UserService {

    //Create new user
    async createUser(user: any) {

        //Add salt to hashing to make it unique
        const salt = await bcryptEncrypter.genSalt();
        const originalPassword = user.password;

        //Hash and encrypt user entered password
        const hashedPassword = await bcryptEncrypter.hash(originalPassword, salt);

        user.password = hashedPassword;

        return await Userr.create(user);
    }

    async getUser(email: string) {
        //Makes email search filter case insensitive and a lot more broad(even if search parameter isnt completely correct.)
        let emailRegexed = new RegExp(email, 'i');

        return await Userr.findOne({ email: emailRegexed });
    }

    async getAllUsers() {
        return await Userr.find();
    }

    async updateUserByEmail(email: string, data: any) {

        //makes email case insensitive
        let emailRegexed = new RegExp(email, 'i');
        return await Userr.findOneAndUpdate({ email: emailRegexed }, data, { new: true });
    }

    async deleteUser(email: string) {
        return await Userr.findOneAndDelete({ email: email });
    }
}

module.exports = new UserService();