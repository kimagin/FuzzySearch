// Create a global data object for Alpine
document.addEventListener('alpine:init', () => {
  Alpine.data('data', () => ({
    async init() {},
    query: '',
    filteredPosts: [],
  }))
})
