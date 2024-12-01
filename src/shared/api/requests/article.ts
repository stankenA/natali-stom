import api from '@/shared/api';
import { ApiArticle } from '@/shared/lib/types';

export type GetArticleParams = {
  slug: string;
};

const getArticle = ({ slug }: GetArticleParams) =>
  api<ApiArticle>({ method: 'get', url: `/article/${slug}/` }).then((res) => res.data);

export const articlesApi = {
  getArticle,
};
