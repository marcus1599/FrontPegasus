export interface Post {
    id_postagem?: number;
    nome: string;
    descricao: string;
    data_criacao: string; 
    imagem?: File | null;
 }
  