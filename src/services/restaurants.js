import { http } from './config'

export default {

    listar:() => {
        return http.get('restaurants')
    },

    salvar:(restaurant) => {
        return http.post('restaurants', restaurant)
    },

    atualizar:(restaurant) => {
        return http.put('restaurants', restaurant)
    },

    apagar:(restaurant) => {
        return http.delete('restaurants', { data: restaurant })
    }    

}