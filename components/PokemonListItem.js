app.component('pokemon-list-item', {
    props: ["name", "pokemonLink"], 
    template: 
    /*html*/
    `<div class="PokemonItem">
      <p class="PokemonItemText">{{ pokemonName }}</p>
      <p class="PokemonItemText">{{ id }}</p>
      <img :src="imgLink" style="width: 80px;">
    </div>`,
    data() {
      return {
          id: 0,
          pokemonName: this.name,
          type: [],
          imgLink: "",
          pokemonRoute: this.pokemonLink
      }
    },
    methods: {
    },
    computed: {
    },
    mounted () {
      axios
        .get(this.pokemonRoute)
        .then(response => {
          this.imgLink = response.data.sprites.front_default
          this.id = response.data.id
          this.type = response.data.types
        })
  }
  })