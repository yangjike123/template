import { createContext } from 'react';
import { IAccount } from "../../types/IAccount";

export const UserInfoData = createContext<IAccount>({} as IAccount);