# Fuzzy Search

This is a reference project created to implement a **fuzzy search** algorithm into other projects.

Created with the following:

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Fuse](https://fusejs.io/)
- [Alpine](https://alpinejs.dev/)

## What is the challenge?

The main challenge was to fetch all the data in the server-side, receive the query from the user on the client side and filter the results on the server side again.

In order to acheive this, all the posts passed through to the Alpine object via a data-attribute and then it will get processed there :

```jsx

// Front matter 👇
---
  // Fetch all the blog posts
const blogPosts = await getCollection('blog', ({ data }) => {
  return data
})

// Pass the fetched data to the data attribute of the section that will show the links
function sendPosts(collection) {
  return JSON.stringify(collection)
}
---

<section id="results" data-posts={sendPosts(blogPosts)}>
// results will come here ...
</section>

```

## How to solve the problem?

Although the problem is solved, but it doesn't really feel like the most elegant solution. I'm also worried about the performance issues.

Using Alpine made things much easier and it let me do the whole component in one place:

```js
import Fuse from 'fuse.js'

// Create a global data object for Alpine
document.addEventListener('alpine:init', () => {
  Alpine.data('data', () => ({
    async init() {
      // Receive all the post information retrived from the front matter via a data-attribute. We need to parse the text into a JSON object
      const allPosts = JSON.parse(
        document.getElementById('results').dataset.posts
      )

      // Fuse will use the following options
      const options = {
        includeMatches: true,
        minMatchCharLength: 1,
        threshold: 0.5,
        keys: [
          'data.title',
          'data.shortDescription',
          'data.category',
          'data.author',
        ],
      }
      // Create a new Fuzzy Search instance from all the posts
      const fuse = new Fuse(allPosts, options)
      const unfilteredPosts = allPosts.map((post) => {
        return {
          item: post,
        }
      })

      this.filteredPosts = unfilteredPosts
      // Any time that the query is changed, filteredPosts will get updated
      this.$watch('query', (value) => {
        if (value === '') {
          console.log('empty')
          this.filteredPosts = unfilteredPosts
        } else {
          this.filteredPosts = fuse.search(this.query)
        }
      })
    },
    query: '',
    filteredPosts: [],
  }))
})
```

I will appreciate it if you fork the project and try to improve it.
