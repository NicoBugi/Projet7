import React from 'react';
import { Routes, Route } from 'react-router-dom'

import { Home, Addpost, Profil, Modifypost } from '@/pages/Public'
import Error from '@/_utils/Error'

const PublicRouter = () => {
    return (

        <Routes>
            <Route path="home" element={<Home />} />
            <Route path="addpost" element={<Addpost />} />
            <Route path="profil" element={<Profil />} />
            <Route path="modifypost" element={<Modifypost />} />
            <Route path="*" element={<Error />} />

        </Routes>



    );
};

export default PublicRouter;