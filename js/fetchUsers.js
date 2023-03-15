// Fetch users

export function fetchUsers()
{
    return fetch("https://restcountries.com/v3.1/all").then((response) =>
    {
        if (!response.ok)
        {
            if (response.status === 404)
            {
                return [];
            }
            throw new Error(response.status);
        }
        return response.json();
    });
}