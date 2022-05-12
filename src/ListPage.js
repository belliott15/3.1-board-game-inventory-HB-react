import { useState, useEffect } from 'react';
import { getGames } from './services/fetch-utils';
import Game from './Game';

export default function ListPage() {
  // you'll need some state to hold onto the array of games
  const [games, setGames] = useState([{
    title: 'Mystery Game',
    genre: 'cooperative',
    designer: 'Tyler',
    minPlayers: 2,
    maxPlayers: 6,
    description: 'Mystery game for mysterious people'
  }]);
  // fetch the games on load and inject them into state
  useEffect(() => {
    async function allGames(){
      const allGames = await getGames();
      setGames(allGames);
    }
    allGames();
  }, []);
  return (
    <div className='list games'>
      {/* map through the games in state and render Game components */}
      {games.map(game => <Game key={game.id + game.maxPlayers} game={game} />)}
    </div>
  );
}
