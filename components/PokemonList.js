app.component('pokemon-list', {
  props: {
  },
  template: 
  /*html*/
  `<div class="product-display">
    <div class="product-container">
      <div class="product-info">
        <h1>Pokedex</h1>

        <div style="display: flex; flex-wrap: wrap;">
          <pokemon-thuile v-for="item in pokemonList" :name="item.name" :pokemonLink="item.url"></pokemon-thuile>
        </div>
        <button 
          class="button" 
          :class="{ disabledButton: previousLink == null }" 
          :disabled="previousLink == null" 
          v-on:click="getPreviousPage">
          Previous
        </button>

        <button 
          class="button" 
          :class="{ disabledButton: nextLink == null }" 
          :disabled="nextLink == null" 
          v-on:click="getNextPage">
          Next
        </button>
      </div>
    </div>
  </div>`,
  data() {
    return {
        pokemonList: [],
        nextLink: null,
        previousLink: null,
    }
  },
  methods: {
    getNextPage() {
      this.pokemonList = []
      axios
        .get(this.nextLink)
        .then(response => {
          this.pokemonList  = response.data.results
          this.previousLink = response.data.previous
          this.nextLink     = response.data.next
          console.log(response.data.results)
        })
    },
    getPreviousPage() {
      this.pokemonList = []
      axios
        .get(this.previousLink)
        .then(response => {
          this.pokemonList  = response.data.results
          this.previousLink = response.data.previous
          this.nextLink     = response.data.next
        })
    }
  },
  computed: {
      
  },
  mounted () {
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then(response => {
        this.pokemonList  = response.data.results
        this.previousLink = response.data.previous
        this.nextLink     = response.data.next
      })
}
})