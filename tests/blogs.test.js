const listHelper = require('../utils/list_helpers')

/*test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
*/
test('totallikes', () => {
	const blogs = [
    	{
        	"title": "katti matikaisen happotekno blogi",
        	"author": "Katti Matikainen",
        	"url": "katti.com",
        	"likes": 84,
        	"id": "5dca77bcb3c16e0b44ec2594"
    	},
    	{
        	"title": "athene pöhinä blogi",
        	"author": "Katri niemi",
        	"url": "katri.com",
        	"likes": 600,
        	"id": "5dca8e1e96dde92cb8ce3337"
    	},
    	{
        	"title": "tomin äiä blogi",
        	"author": "Tomi bjorck",
        	"url": "tomi.com",
        	"likes": 6,
        	"id": "5dca9eedc856ff5f1414c59a"
    	}
	]
	const result = listHelper.totalLikes(blogs)
	expect(result).toBe(690)
})

test('favorite', () => {
	const blogs = [
    	{
        	"title": "katti matikaisen happotekno blogi",
        	"author": "Katti Matikainen",
        	"url": "katti.com",
        	"likes": 84,
        	"id": "5dca77bcb3c16e0b44ec2594"
    	},
    	{
        	"title": "athene pöhinä blogi",
        	"author": "Katri niemi",
        	"url": "katri.com",
        	"likes": 600,
        	"id": "5dca8e1e96dde92cb8ce3337"
    	},
    	{
        	"title": "tomin äiä blogi",
        	"author": "Tomi bjorck",
        	"url": "tomi.com",
        	"likes": 6,
        	"id": "5dca9eedc856ff5f1414c59a"
    	}
	]
	const result = listHelper.favoriteBlog(blogs)
	expect(result).toEqual({
        	"title": "athene pöhinä blogi",
        	"author": "Katri niemi",
        	"url": "katri.com",
        	"likes": 600,
        	"id": "5dca8e1e96dde92cb8ce3337"
    	})
})