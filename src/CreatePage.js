import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createGame } from './services/fetch-utils';

export default function CreatePage() {
  // you'll need the history hook from react-router-dom to do your redirecting in the handleSubmit
  const { push } = useHistory();
  // here's the state you'll need:
    // title;
    // genre;
    // designer;
    // description;
    // minPlayers;
    // maxPlayers;
  const [gameData, setGameData] = useState({
    title: '', 
    genre: '',
    designer: '',
    description: '',
    min_players: 0,
    max_players: 0
  });


  async function handleSubmit(e) {
    e.preventDefault();

    // create a game
    await createGame(gameData);
    
    // use history.push to send the user to the list page
    push('/board-games');
  }

  return (
    <div className='create'>
      {/* on submit, call your handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <h2>Add board game</h2>
        <label>
            Title
          {/* on change, set the title in state */}
          <input value={gameData.title} onChange={(e) => setGameData({
            ...gameData, 
            title: e.target.value,
          })} required name='title' />
        </label>
        <label>
            Genre
          {/* on change, set the genre in state */}
          <select value={gameData.genre} onChange={(e) => setGameData({
            ...gameData,
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
          <input value={gameData.designer} onChange={(e) => setGameData({
            ...gameData, 
            designer: e.target.value,
          })} required name='designer' />
        </label>
        <label>
            Min Players
          {/* on change, set the min players in state */}
          <input value={gameData.min_players} onChange={(e) => setGameData({
            ...gameData, 
            min_players: e.target.value,
          })}required name='min_players' />
        </label>
        <label>
            Max Players
          {/* on change, set the max players in state */}
          <input value={gameData.max_players} onChange={(e) => setGameData({
            ...gameData, 
            max_players: e.target.value,
          })}required name='max_players' />
        </label>
        <label>
            Description
          {/* on change, set the description in state */}
          <textarea value={gameData.description} onChange={(e) => setGameData({
            ...gameData, 
            description: e.target.value,
          })}required name='max_players' />
        </label>
        <button>Create game</button>
      </form>
    </div>
  );
}
