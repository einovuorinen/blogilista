const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		console.log(item)
		return sum + item.likes
	} 

	return blogs.length === 0
		? 0
		: blogs.reduce(reducer, 0);
}

const favoriteBlog = (blogs) => {
	const reducer = (current, item) => {
		return item.likes > current.likes
			? item
			: current
	}

	return blogs.reduce(reducer, blogs[0]);
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}