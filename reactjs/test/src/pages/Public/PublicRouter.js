import React from 'react';
import { Routes, Route } from 'react-router-dom'

import { Layout, Home, User, Login, Signup } from '@/pages/Public'
import Error from '@/_utils/Error'
const PublicRouter = () => {
    return (

        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/user' element={<User />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="*" element={<Error />} />
            </Route>
        </Routes>



    );
};

export default PublicRouter;