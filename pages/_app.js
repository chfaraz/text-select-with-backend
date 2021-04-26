import '../styles/globals.css';
import { AppWrapper } from '../state';
import client from '../apollo-client';
import { ApolloProvider } from '@apollo/client';

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <AppWrapper>
                <Component {...pageProps} />
            </AppWrapper>
        </ApolloProvider>
    );
}

export default MyApp;
