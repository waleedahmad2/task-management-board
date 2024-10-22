import { useHome } from '#/pages/home';

export function Home() {
  const { data, isFetching, onClickTitle } = useHome();

  return isFetching ? (
    <div> Loading...</div>
  ) : (
    <>
      <div>
        UUID: {data?.uuid} <br />
        Name: {data?.setting?.botName}
      </div>
      <button onClick={onClickTitle}> Click me to Post</button>
    </>
  );
}
