app.component('pokemon-thuile', {
    props: ["name", "pokemonLink"], 
    template: 
    /*html*/
    `<div style="margin: 5px;">
      <p>{{ pokemonName }}</p>
      <p>{{ id }}</p>
      <img :src="imgLink" style="width: 120px;">
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