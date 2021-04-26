import { createContext, useContext, useEffect, useState } from 'react';
import client from './apollo-client';
import { gql } from '@apollo/client';

const AppContext = createContext();

export function AppWrapper({ children, data }) {
    const [state, setstate] = useState('');
    useEffect(() => {
        client
            .query({
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
            })
            .then((data) => setstate(data.data.episodesByIds));
    }, []);

    return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    return useContext(AppContext);
}

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
