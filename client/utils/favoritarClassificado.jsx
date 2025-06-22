import { apiClient } from "./apiClient"


export default function FavoriteHandler({ props }) {
    
    const id = props.id

    async function favoritarClassificado(id) {
        let response = await apiClient.get("/salvo/" + id);
        
    }
}