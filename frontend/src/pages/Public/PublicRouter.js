// import des modules necessaires
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Home, Addpost } from '@/pages/Public'
import Error from '@/_utils/Error'

// fonction de routage des pages publique
const PublicRouter = () => {
    return (

        <Routes>
            <Route path="home" element={<Home />} />
            <Route path="addpost" element={<Addpost />} />
            <Route path="*" element={<Error />} />
        </Routes>

    );
};
// export du sous routage pour le router principal
export default PublicRouter;