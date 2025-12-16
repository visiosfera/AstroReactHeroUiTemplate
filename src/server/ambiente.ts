export class Ambiente {
    constructor() {
        console.log('CONSTRUTOR');
    }

    public async teste(): Promise<string> {
        const resposta = await fetch("api/pagina-api", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!resposta.ok) {
            return resposta.json();
        }

        return resposta.json();
    }
}