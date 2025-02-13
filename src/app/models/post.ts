export interface Post {
    id_postagem?: number;
    nome: string;
    descricao: string;
    data_criacao: string; 
    usuario_id_usuario: number;
    imagems?: File | null;
 }
  