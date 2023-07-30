"use client";

import { useState, useEffect }from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	)
}

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
		console.log(searchText);
	}

	const tagClickHandler = (tag) => {
		setSearchText(tag);
	}

	const filteredPosts = posts.filter((post) => { 
		const { creator: { email, username }, prompt, tag } = post;
		const promptMatch = prompt.toLowerCase().includes(searchText.toLowerCase());
		const emailMatch = email.toLowerCase().includes(searchText.toLowerCase());
		const usernameMatch = username.toLowerCase().includes(searchText.toLowerCase());
		const tagMatch = tag.toLowerCase().includes(searchText.toLowerCase());

		return promptMatch || emailMatch || usernameMatch || tagMatch;
	});

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt');
			const data = await response.json();

			setPosts(data);
		}

		fetchPosts();
	}, [])

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input 
					className="search_input peer"
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
				/>
			</form>

			<PromptCardList
				data={filteredPosts}
				handleTagClick={tagClickHandler}
			/>

		</section>
	)
}

export default Feed