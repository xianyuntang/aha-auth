import { JwtTokenPayload } from 'common';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();
  const [{ accessToken, refreshToken }, setCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);

  useEffect(() => {
    try {
      const decodedJwtToken = jwt.decode(accessToken) as JwtTokenPayload;

      if (decodedJwtToken.exp > dayjs().unix()) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (e) {
      setIsLogin(false);
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
    updateAccessToken,
    updateRefreshToken,
    logout,
  };
};
