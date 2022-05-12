import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getGameById, updateGame } from './services/fetch-utils';

export default function DetailPage() {
  const { id } = useParams();
  const { push } = useHistory();
  const [game, setGame] = useState({
    title: '',
    genre: '',
    designer: '',
    max_players: 0,
    min_players: 0,
    description: ''
  });

  // on mount, fetch and set in state the correct board game for this id (the id can be found in match.params using the correct react-router hook)
  useEffect(() => {
    async function gameDetail(){
      const singleGame = await getGameById(id);
      setGame(singleGame);
    }
    gameDetail();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    // create a game
    await updateGame(game, id);
    
    // use history.push to send the user to the list page
    push('/board-games');
  }

  // refactor this component to be a form that hydrates a form with data using the id from the URL params in react-router
  // this form should let the user update the item on submit
  return (
    <div className='detail'>
      <form onSubmit={handleSubmit}>
        <h2>Edit {game.title}</h2>
        <label>
            Title
          {/* on change, set the title in state */}
          <input value={game.title} onChange={(e) => setGame({
            ...game, 
            title: e.target.value,
          })} required name='title' />
        </label>
        <label>
            Genre
          {/* on change, set the genre in state */}
          <select value={game.genre} onChange={(e) => setGame({
            ...game,
            genre: e.target.value,
          })
          } required>
            <option>Tile-laying</option>
            <option>Economic</option>
            <option>War</option>
            <option>Card</option>
            <option>Abstract</option>
            <option>Cooperative</option>
            <option>Solo</option>
          </select>
        </label>
        <label>
            Designer
          {/* on change, set the designer in state */}
          <input value={game.designer} onChange={(e) => setGame({
            ...game, 
            designer: e.target.value,
          })} required name='designer' />
        </label>
        <label>
            Min Players
          {/* on change, set the min players in state */}
          <input value={game.min_players} onChange={(e) => setGame({
            ...game, 
            min_players: e.target.value,
          })}required name='min_players' />
        </label>
        <label>
            Max Players
          {/* on change, set the max players in state */}
          <input value={game.max_players} onChange={(e) => setGame({
            ...game, 
            max_players: e.target.value,
          })}required name='max_players' />
        </label>
        <label>
            Description
          {/* on change, set the description in state */}
          <textarea value={game.description} onChange={(e) => setGame({
            ...game, 
            description: e.target.value,
          })}required name='max_players' />
        </label>
        <button>Create game</button>
      </form>
    </div>
  );
}
