// export function formatArticle(article: string){
//   const regexFindSubtitles = /\(\((.*?)\)\)/g; // Captura ((subtítulo))

//   let novoTexto = article;
//   novoTexto = novoTexto.replace(/^\d+\.\s(.+)$/gm, '<ol><li>$1</li></ol>');
//   const matches = novoTexto.match(regexFindSubtitles);
//   if (matches) {
//     matches.forEach((match: string) => {
//       const textoSemParenteses = match.replace(/\(\(|\)\)/g, '').trim();
//       const novoSubtitulo = `<h3>${textoSemParenteses}</h3>`;

//       novoTexto = novoTexto.replace(match, `<br>${novoSubtitulo}`); // Adicionando <br> antes e depois de cada subtítulo
//     });
//   }
//   novoTexto = novoTexto.replace(/\n\s*\n/g, '</p><p>'); // Separando parágrafos com tags <p>
//   novoTexto = `<p>${novoTexto}</p>`; // Adicionando tags <p> ao redor de todo o texto
//   novoTexto = novoTexto.replace(/\)\s*(\w+)/g, ')');
//   return novoTexto;
// }

export function formatArticle(article: string) {
  let novoTexto = article;

  // Subtítulos ((Texto)) → <h3>Texto</h3>
  novoTexto = novoTexto.replace(/\(\((.*?)\)\)/g, '<br><h3>$1</h3>');

  //negrito **texto**
  novoTexto = novoTexto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Citações > Texto → <blockquote>Texto</blockquote>
  novoTexto = novoTexto.replace(/^>\s*(.*)$/gm, '<blockquote>$1</blockquote>');

  // Quebra de linha extra → transforma em parágrafo
  novoTexto = novoTexto.replace(/\n\s*\n/g, '</p><p>');
  novoTexto = `<p>${novoTexto}</p>`;

  return novoTexto;
}

