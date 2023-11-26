import { createJWT } from "../utils/authentication";
import { IReq, IRes } from "../utils/type";
import validate from "../utils/validation";
import bcrypt from 'bcrypt';
import User from "../models/userModel";

const login = async (req: IReq<any>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const jwt = createJWT(user);

    res.send({ token: jwt });
  } catch (error:any) {
    res.status(500).send({ message: error.message });
  }
};

const register = async (req: IReq<any>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const { name, password } = req.body;

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      password: hashedPassword,
    });

    await user.save();

    const jwt = createJWT(user);

    res.send({ token: jwt });
  } catch (error:any) {
    res.status(500).send({ message: error.message });
  }
};


export { login, register };
