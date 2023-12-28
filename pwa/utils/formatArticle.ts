export function formatArticle(article: string){
  const regex = /\((.*?)\)/g;
  let novoTexto = article;
  const matches = novoTexto.match(regex);
  if (matches) {
    matches.forEach((match: string) => {
      const textoSemParenteses = match.replace(/[()]/g, ' ');
      const novoSubtitulo = `<h3>${textoSemParenteses}</h3>`;

      novoTexto = novoTexto.replace(match, `<br>${novoSubtitulo}`); // Adicionando <br> antes e depois de cada subtítulo
    });
  }
  novoTexto = novoTexto.replace(/\n\s*\n/g, '</p><p>'); // Separando parágrafos com tags <p>
  novoTexto = `<p>${novoTexto}</p>`; // Adicionando tags <p> ao redor de todo o texto
  novoTexto = novoTexto.replace(/\)\s*(\w+)/g, ')');
  return novoTexto;
}
