export default function formatArticle(title: string | null, article: string) {
  if(!article) return ''

  let novoTexto = article;

  if (title) {
    novoTexto = `<h1 style="text-align: center">${title}</h1><br>` + novoTexto;
  }
  // Subtítulos ((Texto))
  novoTexto = novoTexto.replace(/\(\((.*?)\)\)/g, '<br><h3>$1</h3>');

  // Negrito **Texto**
  novoTexto = novoTexto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Listas (.texto)
  novoTexto = novoTexto.replace(/\(\s*\.\s*([\s\S]+?)\s*\)/g, '<li>$1</li>');

  //imagens (%link)
  novoTexto = novoTexto.replace(/\(\%\s*(https?:\/\/\S+\.(jpg|jpeg|png|gif|bmp|svg|webp))\s*\)/gi, '<img src="$1" height="300px" width="500" /><br>');

  //links[texto](link)
  novoTexto = novoTexto.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2">$1</a>');

  //colorir um texto ($text)[cor]
  novoTexto = novoTexto.replace(/\(\$([^\)]+)\)\[([^\]]+)\]/g, '<span style="color:$2">$1</span>');

  // Quebra de linha extra → transforma em parágrafo
  novoTexto = novoTexto.replace(/\n\s*\n/g, '</p><p>');
  novoTexto = `<p>${novoTexto}</p>`;

  return novoTexto;
}