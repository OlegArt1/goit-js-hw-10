export function fetchUsers()
{
    return fetch("https://restcountries.com/v3.1/all").then((response) =>
    {
        if (!response.ok)
        {
            throw new Error(response.status);
        }
        return response.json();
    });
}