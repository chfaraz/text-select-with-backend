import React, { useEffect, useState } from 'react';
import Post from '../components/post';
import Link from 'next/link';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import client from '../apollo-client';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';

import { useAppContext } from '../state';

const Posts = ({ data }) => {
    const dataa = useAppContext();
    console.log(dataa);
    const [movies, setMovies] = useState(data.episodesByIds);

    const router = useRouter();

    useEffect(async () => {
        if (dataa.length !== 0) {
            console.log('if--------------------');
            setMovies(dataa);
        } else {
            console.log('fetch your self');
            const { data } = await client.query({
                query: gql`
                    query {
                        episodesByIds(ids: [3, 4, 5, 6, 7, 8]) {
                            id
                            name
                            air_date
                            episode
                        }
                    }
                `,
            });
            setMovies(data.episodesByIds);
        }
    }, []);

    // const data = await res.json();

    console.log(movies);
    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" className="" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        <Link href="/postInfo">Posts</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="grid grid-cols-3 gap-[15px] p-[15px] bg-[#d5d5d5]">
                {movies.map((movie, i) => {
                    return (
                        <div
                            key={i}
                            onClick={() =>
                                router.push({
                                    pathname: '/postInfo',
                                    query: { pid: movie.id, img: i + 1 },
                                })
                            }
                            className="cursor-pointer"
                        >
                            <Post img={`${i + 1}.webp`} title={movie.name} time={movie.air_date} episode={movie.episode} />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export async function getServerSideProps() {
    const { data } = await client.query({
        query: gql`
            query {
                episodesByIds(ids: [3, 4, 5, 6, 7, 8]) {
                    id
                    name
                    air_date
                    episode
                }
            }
        `,
    });

    return {
        props: {
            data,
        },
    };
}

export default Posts;
