export interface IPost{
  id?: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName?: string;

}


export interface CRUDAction<T> {
  action: 'add' | 'update' | 'delete';
  data: T;
}
