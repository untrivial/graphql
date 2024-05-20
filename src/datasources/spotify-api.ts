import { Playlist } from "../types";
import { RESTDataSource } from "@apollo/datasource-rest";

export class SpotifyAPI extends RESTDataSource {
    baseURL = "https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/";
    async getFeaturedPlaylists(): Promise<Playlist[]> {
        const response = await this.get<{ 
            playlists: { 
                items: any[] 
            };
        }>("browse/featured-playlists");

        return response?.playlists?.items ?? [];
    }

    getPlaylist(playlistId: string): Promise<Playlist> {
        return this.get(`playlists/${playlistId}`);
    }

    async getTracks(playlistId: string): Promise<Track[]> {
        const response = await this.get<{ items: { track: Track }[] }>(`playlists/${playlistId}/tracks`)
        return response?.items?.map(({track}) => track) ?? [];
    }
}
