// Fetch users

export function fetchUsers(name)
{
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=,name,capital,population,flags,languages`).then((response) =>
    {
        if (!response.ok)
        {
            if (response.status === 404)
            {
                console.log("\nError status = ", response.status);

                return [];
            }
            throw new Error(response.status);
        }
        return response.json();
    });
}