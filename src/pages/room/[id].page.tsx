import { useContext, useEffect } from 'react';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { wrapper } from '@/stores';
import { getInitialLocale } from '@/utils/i18n';
import GameOfLifeMapContainer from '@/components/containers/GameOfLifeMapContainer';
import GameRoomSideBar from '@/components/sidebars/GameRoomSideBar';
import GameOfLibertyContext from '@/contexts/GameOfLiberty';

const Room: NextPage = function Room() {
  const { status, joinGame, leaveGame } = useContext(GameOfLibertyContext);

  useEffect(() => {
    if (status !== 'ONLINE') {
      joinGame();
    }

    return () => {
      if (status === 'ONLINE') {
        leaveGame();
      }
    };
  }, [status]);

  return (
    <main style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <section style={{ flexShrink: '0', height: '100%' }}>
        <GameRoomSideBar />
      </section>
      <section style={{ flexGrow: '1' }}>
        <GameOfLifeMapContainer unitSize={20} />
      </section>
    </main>
  );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  () =>
    async ({ locale }) => ({
      props: {
        ...(await serverSideTranslations(getInitialLocale(locale), ['room'])),
      },
    })
);

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
});

export default Room;
