import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getGameById } from './services/fetch-utils';

export default function DetailPage() {
  const [game, setGame] = useState({});

  // on mount, fetch and set in state the correct board game for this id (the id can be found in match.params using the correct react-router hook)

  // refactor this component to be a form that hydrates a form with data using the id from the URL params in react-router
  // this form should let the user update the item on submit
  return (
    <div className='detail'>
      <h1>{game.title}</h1>
      <h2>A {game.genre} game for {game.min_players} to {game.max_players} players</h2>
      <h3>by celebrated designer {game.designer}</h3>
      <p>
        {game.description}
      </p>
    </div>
  );
}
