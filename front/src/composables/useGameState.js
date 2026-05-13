import { user } from "./useAuth";

export let room = null;
export let enemy = null;
export const defineRoom = (data) => {
    room = data
    enemy = room.players.find(player => player.id != user.id)
    console.log('inimigo: ' + enemy + ' Data: ' + data)
}