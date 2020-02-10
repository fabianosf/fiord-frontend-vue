<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Restaurant Front</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{ erro.field }}</b> {{ erro.defaultMessage }}
        </li>
      </ul>
      
      <form @submit.prevent="salvar">

          <label>Nome Restaurant</label>
          <input type="text" placeholder="Nome Restaurant" v-model="restaurant.name">
          

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>                    
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="restaurant of restaurants" :key="restaurant">

            <td>{{ restaurant.name }}</td>                      
            <td>
              <button @click="editar(restaurant)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(restaurant)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template> 

<script>
 

 import Restaurant from './services/restaurants'
 export default {
   
   data(){
     return {
       id: '',
       restaurant: {
         name: ''
       }, 
       restaurants: [],
       errors: []    
     }
   },


   mounted(){
     this.listar()
   },

   methods:{

     listar(){
       Restaurant.listar().then(resposta => {        
        this.restaurants = resposta.data
      })
     },

    salvar(){

      if(!this.restaurant.id){

        Restaurant.salvar(this.restaurant).then(resposta => {
          this.restaurant = {}
          alert('Salvo com sucesso !')
          this.listar()
        }).catch(e => {          
          this.errors = e.response.data.errors
        })

      }else{
          Restaurant.atualizar(this.restaurant).then(resposta => {
            this.restaurant = {}
            alert('Atualizado com sucesso !')
            this.listar()
        }).catch(e => {          
            this.errors = e.response.data.errors
        })
      }

      
    },

    editar(restaurant){
      this.restaurant = restaurant      
    },

    remover(restaurant){

      if(confirm('Deseja excluir o nome do restaurante ? ')) {
        Restaurant.apagar(restaurant).then(resposta => {
        this.listar();
        this.errors = []
      }).catch(e => {
        this.errors = e.response.data.errors
      })
    }   

   }

 }

 }


</script>






<style>
 
</style>
