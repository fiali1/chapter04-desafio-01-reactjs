/* eslint-disable no-nested-ternary */
import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { AxiosResponse } from 'axios';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

async function fetchImages({ pageParam = null }): Promise<AxiosResponse> {
  return api.get('/api/images', {
    params: {
      after: pageParam,
    },
  });
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage.data.after,
  });

  const formattedData = useMemo(() => {
    const pages = data?.pages;
    const formattedPages = pages?.map(page => page.data.data).flat();
    return formattedPages;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) return <Loading />;

  // TODO RENDER ERROR SCREEN
  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button variant="solid" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
