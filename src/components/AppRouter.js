import React, { useContext } from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import { Context } from '../App';
import { ADMIN, SHOP_ROUTE } from '../utils/consts';
import {useAuthState} from 'react-firebase-hooks/auth';


export default function AppRouter() {
  const {auth} = useContext(Context);
  const [user] = useAuthState(auth);

    return (
      <Routes>
         {(user && user.email === ADMIN) && authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component />} exact/>
          )}
          {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component />} exact/>
          )}
          <Route path='*' element={<Navigate to={SHOP_ROUTE} replace />} />
      </Routes>
    )
}