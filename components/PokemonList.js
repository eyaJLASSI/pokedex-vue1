app.component('pokemon-list', {
  props: {
  },
  template: 
  /*html*/
  `<div class="pokemon-display">
    <div class="pokemon-container">
      <div class="product-info">
        <h1>Pokedex</h1>
        <input v-model="message" placeholder="Entrez votre recherche">
        <button
        class="button"
        :class="{ disabledButton: message == '' }" 
        :disabled="message == ''"
        v-on:click="search(this.message)" 
        >
          Rechercher
        </button>
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

      <div>
        <pokemon-details></pokemon-details>
      </div>
    </div>
  </div>`,
  data() {
    return {
        pokemonList: [],
        nextLink: null,
        previousLink: null,
        message: "",
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
    },
    search(searchTerm) {
      this.pokemonList = []
      axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1126")
      .then(response => {
        var searchResult = response.data.results.filter((x) => x.name.includes(searchTerm)) ;
        this.pokemonList  = searchResult
        this.previousLink = null
        this.nextLink     = null
      })
    },
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