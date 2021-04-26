import React, { useEffect, useState } from 'react';

import PostDetail from '../../components/postDetail';

import { gql, useQuery } from '@apollo/client';

import { useRouter } from 'next/router';

import { useAppContext } from '../../state';
import Post from '../../components/post';

const GET_MOVIES = gql`
    query episodesByIds($id: [ID!]!) {
        episodesByIds(ids: $id) {
            id
            name
            air_date
            episode
        }
    }
`;

const PostInfo = () => {
    const dataa = useAppContext();
    const router = useRouter();
    const id = router.query.pid;
    let movies;
    console.log(router.query);

    if (dataa.length !== 0) {
        movies = dataa.find((e) => e.id === id);
        console.log(dataa);
    } else {
        const { loading, data } = useQuery(GET_MOVIES, {
            variables: { id: id },
        });
        console.log('ifaaaaaaaaaaaaaaaaaaaaaaa', data);
        if (loading) return null;

        movies = data.episodesByIds[0];
    }
    return (
        <div>
            <Post img={`../${router.query.pid - 2}.webp`} h title={movies.name} time={movies.air_date} episode={movies.episode} />

            {/* <PostDetail img="http://c.files.bbci.co.uk/4ABA/production/_117803191_gettyimages-1232003438.jpg" title="Art or just a crap?" img2="https://i.pinimg.com/originals/66/59/44/665944970605ed2273788a068895ea39.jpg" /> */}
        </div>
    );
};

export default PostInfo;
