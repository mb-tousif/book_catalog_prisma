export type TBook = {
  bookId: string;
  quantity: number;
};

export type TOrderedBook = TBook & {
  id: string;
};

export type TOrder = {
  orderedBooks: TOrderedBook[];
};