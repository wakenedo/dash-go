import { useQuery } from 'react-query'
import { api } from '../api';

//typing data 
type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export async function getUsers() : Promise<User[]> {
    const { data } = await api.get('users');

    const users = data.users.map((user) => {
        return {
            user: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return users
}

//Custom Hook
// We could pass <User[]> type to the custom hook, but whenever we would want to 
// call the function getUsers, we would also have to call the custom hook
// or else data would still be receiving a type of <any> which is not very good,
// The way its implemented JQuery will understand the component type because of the 
// type we passed to getUsers. 
export function useUsers() {
    return useQuery('users', getUsers, {
        staleTime: 1000 * 5, //5 seconds
    })
}