// Create a global data object for Alpine
document.addEventListener('alpine:init', () => {
  Alpine.data('data', () => ({
    async init() {
      // Receive all the post information retrived from the front matter via a data-attribute. We need to parse the text into a JSON object
      const allPosts = JSON.parse(
        document.getElementById('results').dataset.posts
      )

      // Fuse will use the following options
      // const options = {
      //   includeMatches: true,
      //   minMatchCharLength: 1,
      //   threshold: 0.5,
      //   keys: [
      //     'data.title',
      //     'data.shortDescription',
      //     'data.category',
      //     'data.author',
      //   ],
      // }
      // Create a new Fuzzy Search instance from all the posts
      // const fuse = new Fuse(allPosts, options)
      // const unfilteredPosts = allPosts.map((post) => {
      //   return {
      //     item: post,
      //   }
      // })

      // this.filteredPosts = unfilteredPosts
      // Any time that the query is changed, filteredPosts will get updated
      // this.$watch('query', (value) => {
      //   if (value === '') {
      //     console.log('empty')
      //     // this.filteredPosts = unfilteredPosts
      //   } else {
      //     // this.filteredPosts = fuse.search(this.query)
      //   }
      // })
    },
    query: '',
    filteredPosts: [],
  }))
})
