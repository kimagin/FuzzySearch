import Fuse from 'fuse.js'

// Create a global database for Alpine
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
        minMatchCharLength: 3,
        threshold: 0.6,
        keys: [
          'data.title',
          'data.description',
          'data.category',
          'data.author',
        ],
      }
      // Create a new Fuzzy Search instance from all the posts
      const fuse = new Fuse(allPosts, options)

      // Any time that the query is changed, filteredPosts will get updated
      this.$watch('query', (value) => {
        this.filteredPosts = fuse.search(this.query)
      })
    },
    posts: [],
    cards: [],
    query: '',
    filteredPosts: [],
  }))
})
