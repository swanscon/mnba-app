import './App.css';
import PostList from './components/PostList/PostList';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Welcome to the Minimal NBA Reddit Viewer</h1>
			</header>
			<main>
				<PostList />
			</main>
		</div>
	);
}

export default App;
