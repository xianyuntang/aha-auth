import { AuthorizedUser, JwtTokenPayload } from 'common';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const useAuth = () => {
  const [userData, setUserData] = useState<AuthorizedUser | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();
  const [{ accessToken, refreshToken }, setCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);

  useEffect(() => {
    try {
      const { exp, user } = jwt.decode(accessToken) as JwtTokenPayload;

      if (exp > dayjs().unix()) {
        setIsLogin(true);
        setUserData(user);
      } else {
        setIsLogin(false);
        setUserData(null);
      }
    } catch (e) {
      setIsLogin(false);
      setUserData(null);
    }
  }, [accessToken]);

  const updateAccessToken = (value: string) => {
    setCookie('accessToken', value);
  };

  const updateRefreshToken = (value: string) => {
    setCookie('refreshToken', value);
  };

  const logout = () => {
    updateAccessToken('');
    updateRefreshToken('');
    router.replace('/sign-in');
  };

  return {
    isLogin,
    accessToken,
    refreshToken,
    userData,
    updateAccessToken,
    updateRefreshToken,
    logout,
  };
};
