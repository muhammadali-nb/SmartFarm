
import axios from "axios";
import { users } from "src/__fake_db__/users";
import api from "src/core/axios";
import { JWT_EXPIRES_IN, JWT_SECRET, sign } from "src/utils/jwt";

import { wait } from "src/utils/wait";

export const authLogin = async ({ login, password }: { login: string, password: string }) => {


    const refresh_token = ""
    const access_token = ""

    axios.post('')


    return ({ access_token, refresh_token });
}