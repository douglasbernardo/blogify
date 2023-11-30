
export function formatArticle(article: string){
  const regex = /\((.*?)\)/g;
  let novoTexto = article;
  const matches = novoTexto.match(regex);
  if (matches) {
    matches.forEach((match: string) => {
      const textoSemParenteses = match.replace(/[()]/g, '')
      const novoSubtitulo = `<h3>${textoSemParenteses}</h3>`

      novoTexto = novoTexto.replace(match, novoSubtitulo)
    });
  }
  novoTexto = novoTexto.replace(/\)\s*(\w+)/g, ') \n$1')
  return novoTexto
}
