import { useQuery } from 'react-query'
import { api } from '../api';

//typing data 
type User = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

type GetUserResponse = {
    totalCount: number;
    users: User[];
}

export async function getUsers(page: number): Promise<GetUserResponse> {
    const { data, headers } = await api.get('users', {
        params: {
            page,
        }
    });

    const totalCount = Number(headers['x-total-count'])

    return {
        totalCount,
        users: data.users.map(user => ({
            ...user,
            createdAt: new Date(user.createdAt).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }))
    }
    
}

//Custom Hook
// We could pass <User[]> type to the custom hook, but whenever we would want to 
// call the function getUsers, we would also have to call the custom hook
// or else data would still be receiving a type of <any> which is not very good,
// The way its implemented JQuery will understand the component type because of the 
// type we passed to getUsers. 
export function useUsers(page: number) {
    return useQuery(['users', page], () => getUsers(page), {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}