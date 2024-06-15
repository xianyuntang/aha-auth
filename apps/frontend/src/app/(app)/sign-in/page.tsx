import { Suspense } from 'react';

import SignInPage from '../../../components/pages/sign-in-page';

const RouteSignInPage = () => {
  return (
    <Suspense>
      <SignInPage />
    </Suspense>
  );
};

export default RouteSignInPage;
